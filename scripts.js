// Функция для декодирования Hex в строку с поддержкой UTF-8
function hexDecode(hexString) {
    let byteArray = [];

    // Преобразуем строку HEX в массив байтов
    for (let i = 0; i < hexString.length; i += 2) {
        let byte = parseInt(hexString.substr(i, 2), 16);
        byteArray.push(byte);
    }

    // Преобразуем массив байтов в строку с использованием TextDecoder
    try {
        const decodedText = new TextDecoder('utf-8').decode(new Uint8Array(byteArray));
        return decodedText;
    } catch (e) {
        return "Ошибка: Неверный формат Hex!";
    }
}

// Функция для дешифровки шифра Цезаря
function caesarCipher(text, shift, decrypt = false) {
    let result = '';
    const alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphabetLower = 'abcdefghijklmnopqrstuvwxyz';
    const alphabetUpperCyrillic = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'; // Для верхнего регистра кириллицы
    const alphabetLowerCyrillic = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'; // Для нижнего регистра кириллицы

    // Для дешифровки сдвиг инвертируется
    if (decrypt) {
        shift = -shift;
    }

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        // Для заглавных букв латиницы
        if (alphabetUpper.indexOf(char) !== -1) {
            let index = alphabetUpper.indexOf(char);
            let newIndex = (index + shift + 26) % 26;
            result += alphabetUpper[newIndex];
        }
        // Для строчных букв латиницы
        else if (alphabetLower.indexOf(char) !== -1) {
            let index = alphabetLower.indexOf(char);
            let newIndex = (index + shift + 26) % 26;
            result += alphabetLower[newIndex];
        }
        // Для заглавных букв кириллицы
        else if (alphabetUpperCyrillic.indexOf(char) !== -1) {
            let index = alphabetUpperCyrillic.indexOf(char);
            let newIndex = (index + shift + 33) % 33; // Кириллица (33 буквы)
            result += alphabetUpperCyrillic[newIndex];
        }
        // Для строчных букв кириллицы
        else if (alphabetLowerCyrillic.indexOf(char) !== -1) {
            let index = alphabetLowerCyrillic.indexOf(char);
            let newIndex = (index + shift + 33) % 33; // Кириллица (33 буквы)
            result += alphabetLowerCyrillic[newIndex];
        } else {
            result += char; // Для других символов оставляем как есть
        }
    }

    return result;
}

// Функция для дешифровки ROT с переменным сдвигом
function rotCipher(text, shift, decrypt = false) {
    let result = '';
    const alphabetUpperLatin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphabetLowerLatin = 'abcdefghijklmnopqrstuvwxyz';
    const alphabetUpperCyrillic = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'; // Верхний регистр кириллицы
    const alphabetLowerCyrillic = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'; // Нижний регистр кириллицы

    // Для дешифровки сдвиг инвертируется
    if (decrypt) {
        shift = -shift;
    }

    // Сдвигаем на заданное количество символов
    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        // Для заглавных букв латиницы
        if (alphabetUpperLatin.indexOf(char) !== -1) {
            let index = alphabetUpperLatin.indexOf(char);
            let newIndex = (index + shift + 26) % 26;
            result += alphabetUpperLatin[newIndex];
        }
        // Для строчных букв латиницы
        else if (alphabetLowerLatin.indexOf(char) !== -1) {
            let index = alphabetLowerLatin.indexOf(char);
            let newIndex = (index + shift + 26) % 26;
            result += alphabetLowerLatin[newIndex];
        }
        // Для заглавных букв кириллицы
        else if (alphabetUpperCyrillic.indexOf(char) !== -1) {
            let index = alphabetUpperCyrillic.indexOf(char);
            let newIndex = (index + shift + 33) % 33; // Кириллица (33 буквы)
            result += alphabetUpperCyrillic[newIndex];
        }
        // Для строчных букв кириллицы
        else if (alphabetLowerCyrillic.indexOf(char) !== -1) {
            let index = alphabetLowerCyrillic.indexOf(char);
            let newIndex = (index + shift + 33) % 33; // Кириллица (33 буквы)
            result += alphabetLowerCyrillic[newIndex];
        } else {
            result += char; // Для других символов оставляем как есть
        }
    }

    return result;
}

// Функция для декодирования Base64 с поддержкой кириллицы
function base64Decode(text) {
    try {
        // Декодируем строку Base64 в бинарные данные
        const decodedData = atob(text);

        // Преобразуем бинарные данные в строку UTF-8
        const decodedText = new TextDecoder('utf-8').decode(new Uint8Array([...decodedData].map(char => char.charCodeAt(0))));

        return decodedText;
    } catch (e) {
        return "Ошибка: Неверный формат Base64!";
    }
}

// Функция для вычисления MD5
function md5Hash(text) {
    return CryptoJS.MD5(text).toString(CryptoJS.enc.Base64); // Хеширование MD5
}

// Функция для вычисления SHA1
function sha1Hash(text) {
    return CryptoJS.SHA1(text).toString(CryptoJS.enc.Base64); // Хеширование SHA1
}

// Функция для вычисления SHA256
function sha256Hash(text) {
    return CryptoJS.SHA256(text).toString(CryptoJS.enc.Base64); // Хеширование SHA256
}

// Функция для дешифровки шифра Виженера с поддержкой кириллицы и латиницы
function vigenereCipher(text, key, decrypt = false) {
    let result = '';
    let keyIndex = 0;

    const alphabetUpperCyrillic = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
    const alphabetLowerCyrillic = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    const alphabetUpperLatin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphabetLowerLatin = 'abcdefghijklmnopqrstuvwxyz';

    function getShift(char, keyChar) {
        if (alphabetUpperCyrillic.indexOf(char) !== -1) {
            return alphabetUpperCyrillic.indexOf(keyChar.toUpperCase()) % 33;
        } else if (alphabetLowerCyrillic.indexOf(char) !== -1) {
            return alphabetLowerCyrillic.indexOf(keyChar.toLowerCase()) % 33;
        } else if (alphabetUpperLatin.indexOf(char) !== -1) {
            return alphabetUpperLatin.indexOf(keyChar.toUpperCase()) % 26;
        } else if (alphabetLowerLatin.indexOf(char) !== -1) {
            return alphabetLowerLatin.indexOf(keyChar.toLowerCase()) % 26;
        } else {
            return 0;
        }
    }

    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let keyChar = key[keyIndex % key.length];

        if (alphabetUpperCyrillic.indexOf(char) !== -1) {
            let index = alphabetUpperCyrillic.indexOf(char);
            let shift = getShift(char, keyChar);
            if (decrypt) shift = -shift;
            let newIndex = (index + shift + 33) % 33;
            result += alphabetUpperCyrillic[newIndex];
            keyIndex++;
        }
        else if (alphabetLowerCyrillic.indexOf(char) !== -1) {
            let index = alphabetLowerCyrillic.indexOf(char);
            let shift = getShift(char, keyChar);
            if (decrypt) shift = -shift;
            let newIndex = (index + shift + 33) % 33;
            result += alphabetLowerCyrillic[newIndex];
            keyIndex++;
        }
        else if (alphabetUpperLatin.indexOf(char) !== -1) {
            let index = alphabetUpperLatin.indexOf(char);
            let shift = getShift(char, keyChar);
            if (decrypt) shift = -shift;
            let newIndex = (index + shift + 26) % 26;
            result += alphabetUpperLatin[newIndex];
            keyIndex++;
        }
        else if (alphabetLowerLatin.indexOf(char) !== -1) {
            let index = alphabetLowerLatin.indexOf(char);
            let shift = getShift(char, keyChar);
            if (decrypt) shift = -shift;
            let newIndex = (index + shift + 26) % 26;
            result += alphabetLowerLatin[newIndex];
            keyIndex++;
        } else {
            result += char; // для других символов оставляем как есть
        }
    }

    return result;
}

// Функция для дешифровки
function decryptMessage() {
    let message = document.getElementById("encryptedMessage").value;
    let method = document.getElementById("cipherType").value;
    let shift = parseInt(document.getElementById("shiftKey").value);
    let key = document.getElementById("key") ? document.getElementById("key").value : "";

    let result = '';

    switch (method) {
        case "caesar":
            result = caesarCipher(message, shift, true);
            break;
        case "rot":
            result = rotCipher(message, shift, true);
            break;
        case "base64":
            result = base64Decode(message);  // Декодируем Base64 с поддержкой кириллицы
            break;
        case "vigenere":
            result = vigenereCipher(message, key, true);
            break;
        case "md5":
            result = "MD5 не может быть дешифрован, так как это хеш-функция!";
            break;
        case "sha1":
            result = "SHA1 не может быть дешифрован, так как это хеш-функция!";
            break;
        case "sha256":
            result = "SHA256 не может быть дешифрован, так как это хеш-функция!";
            break;
        case "hex":
            result = hexDecode(message);  // Декодируем Hex в строку с поддержкой UTF-8
            break;
        default:
            result = message;
            break;
    }

    document.getElementById("decryptedMessage").value = result;
}

// Функция для копирования текста в буфер обмена
function copyToClipboard() {
    let resultText = document.getElementById("decryptedMessage");
    resultText.select();
    document.execCommand('copy');
}

// Функция для скачивания результата в текстовый файл
function downloadResult() {
    let resultText = document.getElementById("decryptedMessage").value;
    let blob = new Blob([resultText], { type: 'text/plain' });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "result.txt";
    link.click();
}

// Привязка событий к кнопкам
document.getElementById("decryptBtn").addEventListener("click", decryptMessage);
document.getElementById("copyBtn").addEventListener("click", copyToClipboard);
document.getElementById("downloadBtn").addEventListener("click", downloadResult);
