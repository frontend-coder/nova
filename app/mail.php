<?php

$recepient = "frontendercode@gmail.com";
$sitename  = "Сайт https://frontend-coder.github.io/";
$subject   = "Заказ с сайта https://frontend-coder.github.io/";

$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$formaone = trim($_POST["formaone"]);
$admindata = trim($_POST["admin-data"]);

$message = "
С какого сайта пришло сообщение: $sitename  <br>
Место размещения формы в шаблоне: $formaone  <br>
Место размещения во всплывающей форме: $admindata  <br>
Имя обратившегося: $name  <br>
Почтовый ящик клиента: $email";

$pagetitle = "Новая заявка с сайта \"$sitename\"";
mail($recepient, $subject, $message, "Content-type: text/html; charset=\"utf-8\"\n From: $recepient");
?>