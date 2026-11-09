# Nuxt notepad
- [x] Pinia 
  - [x] Pinia persistance pluign
  - [x] обновление Pinia после изменения данных на новой вкладке
- [x] История изменений задач
  - [x] Сброс redo после изменения
  - [x] Лимит истории изменений
  - [x] Тесты истории изменения
  - [x] debounce изменения текста задачи
- [x] Черновик
  - [x] Сохранение / восстановление / удаление черновика
  - [x] debounce сохранения черновика
- [x] Общее окно подтверждения, composable useConfirm()
- [x] Обработка несуществующей заметки
- [x] Добавление / изменение / удаление заметки и задач
- [x] Dockerfile & docker compose

## Запуск в docker
```bash
docker-compose up --build
```

## Unit тест
```bash
pnpm run test
```