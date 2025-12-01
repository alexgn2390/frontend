## Стандартизация API

## ЗАПРОС
> https://api.nfitnity.com/methods/CATEGORY_NAME.METHOD_NAME

Зачем размещать на поддомене `api`?<br>
Потому что это API

Зачем нужно `/methods/`?<br>
Чтобы отделить api методов, от допустим Long-Pool, который будет находиться на `/longpoll/`.<br>
Или калбеки от других сервисов, которые будут на `/callback/`

`CATEGORY_NAME` – Имя категории так сказать, это например:<br>
`account` – действия с аккаунтом<br>
`training` – действия с тренировками<br>
`admin` – методы для администрации

`METHOD_NAME` – Имя функции, например если категория `account`, то действия с ним могут быть:<br>
`create` – создание<br>
`auth` – авторизация<br>
`refreshToken` – обновить действие токена<br>
`delete` – удалить<br>
`edit` - редактировать


Если имя состоит из более одного слова, то использовать `camelCase`
Например название функции `AddTaskPerDay` в задачах тренировки, то в апи должно быть `training.addTaskPerDay`

###### Примеры
> https://api.nfitnity.com/methods/account.create<br>
> https://api.nfitnity.com/methods/account.auth<br>
> https://api.nfitnity.com/methods/account.edit<br>
> https://api.nfitnity.com/methods/account.getInfo<br>
> https://api.nfitnity.com/methods/training.addTaskPerDay<br>
> https://api.nfitnity.com/methods/training.getTasks


## ОТВЕТ
Весь ответ должен быть в JSON и ложить в response.
Обязательно указывать `status`
```JSON
{
  "status": "success",
  "response":  "Тут ответ. Любой, будь это bool, int, string, object, array не важно"
}
```

###### Пример
```JSON
{
  "status": "success",
  "response": {
    "bool": true,
    "int": 39602,
    "string": "Hi",
    "object": {},
    "array":[]
  }
}
```

Всегда соблюдайте типы полей, если в ответе нужно вернуть (bool) `true`, то нужно возвращать его как bool<br>
Например: ``response: true``, но никак не ``response: "true"`` – в данном случае, это string с 4 символами

Ответ со статусом error
```JSON
{
  "status": "error",
  "error_name": "Тут тег ошибки",
  "error_msg": "Тут сообщение ошибки на ENG"
}
```

Проверять на наличие требуемых полей, если какого-то поля не хватает, то выдавать ошибку с error_name: incorrect_data<br>

![image](https://github.com/ozliginus/ozl.work.nfitnity.app/assets/35627391/bc21c2f1-605a-46f7-a5ee-e0e13fa2528b)

Если все поля на месте, но допусти в поле amount была отправлена строка (string), а ожидалось целое числа (int), то выдавать ошибку incorrect_{FIELD_NAME} в данном случае error_name: incorrect_amount<br>
В error_msg можно написать мини описание поля и что оно требует int, сколько минимум максимум там, ну типо такой инфы<br>

![image](https://github.com/ozliginus/ozl.work.nfitnity.app/assets/35627391/8a0e8222-7cad-417a-aba7-f1c1e6bd425f)

Если например запрос поступил на /methods/nope.none метод, а его нет, то выдавать ошибку<br>

![image](https://github.com/ozliginus/ozl.work.nfitnity.app/assets/35627391/1afcd616-3380-4cc5-80e6-f472c189ebb2)

Если например запрос поступил на метод к которому доступ запрещён, выдать<br>

![image](https://github.com/ozliginus/ozl.work.nfitnity.app/assets/35627391/5e9f3279-b8b5-4aa4-a11a-b9e7bd7fc2b6)

###### Так же могут быть полезны
`limit_reached` – Лимит исчерпан<br>
`many_requests` – Много запросов в последнее время<br>
`premium_expired` – Истекла Premium подписка<br>
`auth_error` – Ошибка авторизации<br>
`invalid_token` – Если токен просрочен или недействителен<br>
Ну и куча других, там уже по надобности придумывать.<br>
Самое главное, чтобы придуманный `error_name` был индивидуальный для конкретного типа ошибки и был задокументирован.

## ПРИМЕРЫ
Для наглядности можно посмотреть как реализован api в одном из моих проектов

Если всё Гуд, вернёт ответ в `response` со статусом `success`<br>
[api.ozliginus.ru/methods/ozprotect.getOnline?ozprotectid=5e01f45ozpv4](https://api.ozliginus.ru/methods/ozprotect.getOnline?ozprotectid=5e01f45ozpv4)<br>
![image](https://github.com/ozliginus/ozl.work.nfitnity.app/assets/35627391/44cc77e1-64d3-4075-adad-82aa79d7b477)


Если неправильно указал параметр, он начнёт ругаться и выдаст ошибку<br>
[api.ozliginus.ru/methods/ozprotect.getOnline?ozprotectid=12](https://api.ozliginus.ru/methods/ozprotect.getOnline?ozprotectid=12)
![image](https://github.com/ozliginus/ozl.work.nfitnity.app/assets/35627391/a02fbff2-1ae8-4ab3-b259-900512864fff)


Если вообще ничего не указал, то выдаёт ошибку `incorrect_data`<br>
[api.ozliginus.ru/methods/ozprotect.getOnline](https://api.ozliginus.ru/methods/ozprotect.getOnline)
![image](https://github.com/ozliginus/ozl.work.nfitnity.app/assets/35627391/5c7675d2-6058-43bc-b509-c6e5bd11637e)

[ozprotect.ozliginus.ru/api/getStats](https://ozprotect.ozliginus.ru/api/getStats)
![image](https://github.com/ozliginus/ozl.work.nfitnity.app/assets/35627391/88404fef-a224-471a-bd28-ee1b3a569abf)
