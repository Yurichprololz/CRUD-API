# CRUD-API

## Начало работы

* Клонируйте данный репозиторий с себе на компьютер

* Проинициализуете зависимости коммандой ***npm instal***

* Запустите программу одной из нижеперечисленных скриптов:

        - start:dev - запускает программу в режиме разработки на 7000 порту.

        - start:prod - компилирует и запускает программу на порту, указанном в окружении (по дефолту 8000).

        - start:multi - запускает горизонтальное масштабирование для приложения с балансировщиком нагрузки. Создаётся количество кластеров равное количеству логических ядер машины.

## Endpoints

- **GET** `api/users` - получить массив данных всех пользователей

- **GET** `api/users/${userId}` - получить данные текущего пользователя

- **POST** `api/users` - отправить данные пользователя

- **PUT** `api/users/{userId}`- изменить данные текущего пользователя

- **DELETE** `api/users/${userId}`- удалить пользователя

## Обьект пользователя

        id: uuid; - генерируется на стороне сервера

        username: string;  - обязательное свойство

        age: number; - обязательное свойство

        hobbies: string[] | []; - обязательное свойство

## Как проверить работу балансировщика загрузки при запуске скрипта **start:multi**

При запуске скрипта код уже передаёт id в дочерний процесс, поэтому мы может просто логирование в файл
server.ts в метод http.createServer и проверять какой кластер его отрабатывает.

>console.log(\`The worker ${process.env.id} is requesting\`);

На локальном сервере наши запросы обрабатываюся давольно быстро и нам нужно постраться чтобы нагрузить
какой-либо кластер. Поэтому давайте нагрузим сервер безполезными расчётами. Там же вставим этот код

>await debounce();

И определим саму функцию

>const debounce = () => {
>
>  return new Promise<void>((res) => {
>
>    for (let index = 0; index < 1e8; index++) {}
>
>    res();
>
>  });
>
>};

Далее нам нужно заДДОСить наш сервер. Тут нам помогут соответствующие библиотеки или мы может сделать 
это в браузере самостоятельно. Зайдём на страницу в нашего сервера, чтобы избежать блокировки CORS . К примеру `http://localhost:7000` и запустим код, который будет отправлять запросы с интервалом 30 мс или другим заданным интервалом.

> setInterval(async () => await fetch('http://localhost:7000/api/users').then(console.log), 30)

Далее в консоли мы можем наблюдать, что для обработки запросов искользуются разные кластеры 

![Работа класстеров](/assets/clusters_small.jpg)