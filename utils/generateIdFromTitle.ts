
export const generateIdFromTitle = (title: string): string => {
    return title
        .toLowerCase()                         // Преобразуем в нижний регистр
        .trim()                                // Убираем пробелы в начале и конце
        .replace(/[^\w\s-]/g, '')              // Убираем все не-буквенные символы, кроме дефисов
        .replace(/\s+/g, '-')                  // Заменяем пробелы на дефисы
        .replace(/-+/g, '-');                  // Убираем повторяющиеся дефисы
};