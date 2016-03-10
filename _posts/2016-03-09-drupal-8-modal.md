---
layout: post
title: "Drupal 8's Modal API"
subtitle: "Creating a simple dialog by example..."
date: 2016-03-09 18:00:00 +0100
tags:
- drupal
- drupal 8
- ctools
- modals
- dialogs
comments: true
---
Using Drupal 7, the contributed module [CTools](https://drupal.org/project/ctools) provided the ability to implement dialogs, even with a fallback when JavaScript was not enabled, allowing a graceful degradation.

The very popular [Views](https://www.drupal.org/project/views) module relied heavily on CTools for dialogs, but even though Views is in Drupal 8 core now, CTools is not. At least, a lot of the ideas and concepts of CTools did made it into core though.
<!--more-->


The Modal API is a good example of this.
You can try out some [example code](https://github.com/jover/drupal-8-modal-example/) directly or read further how to create a basic implementation of a dialog.

Of course you must start creating a new module (let's say _modal\_example_) by creating a module folder.
Contrary to Drupal 7, a _.module_ file is not longer required, so proceed with creating the **modal_example.info.yml** file.

{% highlight yaml linenos %}
name: 'Modal Example'
type: module
description: 'Module which demonstrates an example of a Modal implementation.'
core: 8.x
{% endhighlight %}

Drupal needs to know the _paths_ (or better _routes_) involved for the callbacks of our module, in particular the page and the dialog callback.
Therefore we need to implement the **modal_example.routing.yml** file.

{% highlight yaml linenos %}
modal_example.page:
  path: 'modal-example'
  defaults:
    _title: 'Modal Example'
    _controller: '\Drupal\modal_example\Controller\ModalExampleController::page'
  requirements:
    _permission: 'access content'
modal_example.modal:
  path: 'modal-example/modal/{js}'
  defaults:
    _title: 'Modal'
    _controller: '\Drupal\modal_example\Controller\ModalExampleController::modal'
  requirements:
    _permission: 'access content'
    js: 'nojs|ajax'
{% endhighlight %}

Optionally you can also implement a **modal_example.links.menu.yml** file in order to have a navigation link in the menu.

{% highlight yaml linenos %}
modal_example.page:
  title: 'Modal Example'
  route_name: modal_example.page
  expanded: TRUE
{% endhighlight %}

And last but not least, we need a _Controller_ class which returns the content for either our page and our dialog callback we defined the routing YAML file earlier.
It is of course possible to split up the page and dialog callback in their own _Controller_ class, but we keep it simple for this example.

So lastly implement a _ModalExampleController_ class in a file located at **./src/Controller/ModalExampleController.php** relative to the root of the module.

{% highlight php linenos %}
<?php

/**
 * @file
 * ModalExampleController class.
 */

namespace Drupal\modal_example\Controller;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\OpenModalDialogCommand;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;
use Drupal\Core\Link;
use Drupal\Component\Serialization\Json;

class ModalExampleController extends ControllerBase {

  public function page() {
    $link_url = Url::fromRoute('modal_example.modal', ['js' => 'nojs']);

    $link_url->setOptions([
      'attributes' => [
        'class' => ['use-ajax', 'button', 'button--small'],
        'data-dialog-type' => 'modal',
        'data-dialog-options' => Json::encode(['width' => 400]),
      ]
    ]);

    return array(
      '#type' => 'markup',
      '#markup' => Link::fromTextAndUrl(t('Open the modal'), $link_url)->toString(),
      '#attached' => ['library' => ['core/drupal.dialog.ajax']]
    );
  }

  public function modal($js = 'nojs') {
    if ($js == 'ajax') {
      $options = [
        'dialogClass' => 'popup-dialog-class',
        //'width' => '75%', // apply or override the width of the dialog
      ];
      $response = new AjaxResponse();
      $response->addCommand(new OpenModalDialogCommand(t('Modal title'), t('This is an example of a modal with Javascript.'), $options));
      return $response;
    } else {
      return t('This is an example of a fallback for a modal without Javascript.');
    }
  }
}
{% endhighlight %}
