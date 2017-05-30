<?php

$recepient = "frontendercode@gmail.com";
$sitename  = "Тестирование шаблона Yoga-studio";
$subject   = "Заказ с сайта Тестирование шаблона Yoga-studio";

$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$text = trim($_POST["text"]);
$formaone = trim($_POST["formaone"]);
$admindata = trim($_POST["admin-data"]);

$message = "
С какого сайта пришло сообщение: $sitename  <br>
Место размещения формы в шаблоне: $formaone  <br>
Место размещения во всплывающей форме: $admindata  <br>
Имя обратившегося: $name  <br>
Телефон: $phone <br>
текст: $text";

$pagetitle = "Новая заявка с сайта \"$sitename\"";
mail($recepient, $subject, $message, "Content-type: text/html; charset=\"utf-8\"\n From: $recepient");
?>