// переход на главную (файл "первый.html")
function goHome() {
    document.body.style.transform = 'scale(0.97)';
    setTimeout(() => {
        window.location.href = 'первый.html';
    }, 180);
}

// утилиты
function reduceToSingleDigit(num) {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
        num = num.toString().split('').reduce((a, b) => a + parseInt(b, 10), 0);
    }
    return num;
}

function validateDate(dateStr) {
    const parts = dateStr.split('.');
    if (parts.length !== 3) return false;
    const [day, month, year] = parts.map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year &&
           date.getMonth() === month - 1 &&
           date.getDate() === day;
}

// базовые значения чисел 1–9 + мастер‑числа (для судьбы, души, личности, имени)
const numberMeanings = {
    1: "Лидерство, инициатива, самостоятельность. Важно учиться идти своим путём и не давить на других.",
    2: "Чувствительность, дипломатия, умение сотрудничать. Важно сохранять баланс и не растворяться в чужих желаниях.",
    3: "Творчество, общение, радость. Важно проявлять себя и не уходить в поверхностность.",
    4: "Структура, труд, надёжность. Важно не застревать в рутине и оставаться гибким.",
    5: "Свобода, перемены, энергия. Важно не распыляться и учиться ответственности.",
    6: "Забота, семья, гармония. Важно не жертвовать собой полностью ради других.",
    7: "Глубина, мудрость, духовный поиск. Важно не уходить в изоляцию и холодность.",
    8: "Сила, влияние, материальные достижения. Важно использовать власть экологично.",
    9: "Служение, сострадание, завершения. Важно отпускать прошлое и не впадать в жертвенность.",
    11: "Интуиция, вдохновение, духовное лидерство. Важно уметь заземлять свои идеи.",
    22: "Мастер‑строитель, реализация больших проектов. Важно сохранять баланс между мечтой и реальностью.",
    33: "Мастер‑служение, высокая ответственность за других. Важно не забывать о собственных границах."
};

// КАРМИЧЕСКИЕ ТЕКСТЫ: для каждого числа свой рассказ
const karmaDescriptions = {
    1: "В прошлой жизни человек был правителем или лидером, который привык решать всё в одиночку и подавлять чужую волю. Причиной смерти могли стать предательство или внезапное свержение. Кармическая задача в этой жизни — научиться здоровому лидерству, не разрушая чужую свободу и разделяя ответственность.",
    2: "В прошлой жизни человек жил в роли зависимого партнёра или служащего, который боялся остаться один и жертвовал собой ради гармонии. Часто смерть наступала от болезней нервов, тревоги, изматывающих отношений. Кармическая задача — научиться равноправию, выстраивать честные союзы и не растворяться в других.",
    3: "В прошлой жизни это был артист, рассказчик или человек веселья, который прятал настоящую боль за шутками и поверхностностью. Причиной смерти могли стать излишества, развлечения, невнимание к здоровью. Кармическая задача — использовать свой талант слова и творчества осознанно и перестать убегать от серьёзных тем.",
    4: "В прошлой жизни человек был трудоголиком, ремесленником или чиновником, жившим ради работы и контроля. Часто смерть наступала от переутомления, тяжёлых условий труда или жёстких ограничений. Кармическая задача — научиться строить стабильность без фанатизма, доверять миру и не жить только долгом.",
    5: "В прошлой жизни это был искатель приключений, игрок, путешественник, который гнался за удовольствиями и свободой любой ценой. Причиной смерти могли стать рискованные ситуации, аварии, злоупотребления. Кармическая задача — сохранить дух свободы, но научиться ответственности, мере и уважению к своим и чужим границам.",
    6: "В прошлой жизни человек был родителем, опекуном или хранителем дома, который полностью растворялся в семье и контролировал близких. Часто смерть наступала в одиночестве, с ощущением непонимания и обиды. Кармическая задача — научиться любить без контроля, создавать гармонию без жертвенности и не спасать всех подряд.",
    7: "В прошлой жизни это был отшельник, учёный или мистик, отрезавший себя от людей ради знания и внутреннего мира. Причиной смерти могли стать одиночество, изоляция или отказ принимать помощь. Кармическая задача — соединить духовный путь с живыми людьми, делиться мудростью и не уходить полностью от мира.",
    8: "В прошлой жизни человек был связан с властью, деньгами или силой — правитель, бизнесмен, военный. Часто смерть была результатом злоупотребления властью, жёстких решений, жадности или мести. Кармическая задача — научиться экологично обращаться с ресурсами и влиянием, строить успех без разрушения других.",
    9: "В прошлой жизни это был человек служения: врач, священник, учитель или спасатель, который нёс чужую боль, но забывал о себе. Причиной смерти могли стать истощение, жертва ради других, отказ от личного счастья. Кармическая задача — служить миру, не теряя себя, отпускать прошлое и не жить только чувством вины.",
    11: "В прошлой жизни человек был медиумом, пророком или вдохновителем, но часто не справлялся с потоком видений, уходил в фанатизм или иллюзии. Смерть могла быть связана с преследованием, непониманием общества или психическими перегрузками. Кармическая задача — принять свою интуицию, но опираться на реальность и заботу о теле.",
    22: "В прошлой жизни это был создатель крупных проектов — архитектор, реформатор, лидер больших структур, который мог нести и созидание, и разрушение. Причиной смерти становились крах масштабных планов или тяжесть взятой на себя ответственности. Кармическая задача — реализовывать большие идеи через постепенные шаги, не ломая ни себя, ни других.",
    33: "В прошлой жизни человек был учителем, духовным наставником или «спасителем», который тащил на себе судьбы многих людей. Часто смерть наступала от переутомления, фанатичной веры или самопожертвования. Кармическая задача — служить с мудростью, не забывая о собственных границах и простых человеческих радостях."
};

// генерация звезд и частиц
function createStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = star.style.height = (Math.random() * 3 + 1) + 'px';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        starsContainer.appendChild(star);
    }
}

function createParticles() {
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = particle.style.height = (Math.random() * 6 + 2) + 'px';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 7000);
    }, 320);
}

// вывод результата
function setResult(id, title, number, description) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = `
        <div class="result-title">${title}</div>
        <div class="result-number">Число: ${number}</div>
        <div class="result-meaning">${description}</div>
    `;
    el.classList.add('show');
}

// общий расчёт по дате и имени
function calculateAll() {
    const birth = document.getElementById('userBirth').value.trim();
    const name = document.getElementById('userName').value.trim().toUpperCase();

    if (!validateDate(birth)) {
        alert('Пожалуйста, введите корректную дату рождения в формате ДД.ММ.ГГГГ.');
        return;
    }
    if (!name) {
        alert('Пожалуйста, введите ваше полное имя.');
        return;
    }

    // подставляем дату в поле совместимости
    document.getElementById('compUserDate').value = birth;

    const [day, month, year] = birth.split('.').map(Number);

    // число судьбы (вся дата)
    const destinySum = day + month + year;
    const destiny = reduceToSingleDigit(destinySum);
    setResult(
        'destinyResult',
        'Ваше число судьбы',
        destiny,
        numberMeanings[destiny] || 'Это число задаёт общий вектор вашей жизни и ключевые задачи.'
    );

    // число души (день + месяц)
    const soulSum = day + month;
    const soul = reduceToSingleDigit(soulSum);
    setResult(
        'soulResult',
        'Число вашей души',
        soul,
        numberMeanings[soul] || 'Это число описывает ваши внутренние желания и истинные мотивации.'
    );

    // число личности (день рождения)
    const personality = reduceToSingleDigit(day);
    setResult(
        'personalityResult',
        'Число личности',
        personality,
        numberMeanings[personality] || 'Показывает, как вы выглядите для окружающих и какой образ транслируете.'
    );

    // кармическое число — обязательно есть, считаем по всей дате отдельно
    const karmaRaw = ('' + day + month + year)
        .split('')
        .map(d => parseInt(d, 10))
        .reduce((a, b) => a + b, 0);
    const karmaNumber = reduceToSingleDigit(karmaRaw);
    const karmaText = karmaDescriptions[karmaNumber] ||
        "Это кармическое число отражает опыт прошлых жизней и задачи, с которыми вы пришли в эту жизнь.";

    setResult(
        'karmaResult',
        'Ваше кармическое число',
        karmaNumber,
        karmaText
    );

    // число имени (упрощённая русская нумерология)
    const russianMap = {
        'А':1,'Б':2,'В':3,'Г':4,'Д':5,'Е':6,'Ё':7,'Ж':8,'З':9,'И':1,
        'Й':2,'К':3,'Л':4,'М':5,'Н':6,'О':7,'П':8,'Р':9,'С':1,'Т':2,
        'У':3,'Ф':4,'Х':5,'Ц':6,'Ч':7,'Ш':8,'Щ':9,'Ъ':1,'Ы':2,'Ь':3,
        'Э':4,'Ю':5,'Я':6
    };

    let nameSum = 0;
    for (const ch of name) {
        if (russianMap[ch]) nameSum += russianMap[ch];
    }
    const nameNumber = reduceToSingleDigit(nameSum);
    const nameDescBase = numberMeanings[nameNumber] || 'Имя усиливает вибрации этого числа в вашей жизни.';
    setResult(
        'nameResult',
        'Число вашего имени',
        nameNumber,
        `Имя усиливает качества числа ${nameNumber} в характере и судьбе. ${nameDescBase}`
    );
}

// совместимость с тремя шкалами (как было)
function calculateCompatibility() {
    const userDate = document.getElementById('compUserDate').value.trim();
    const otherDate = document.getElementById('compOtherDate').value.trim();

    if (!validateDate(userDate)) {
        alert('Сначала корректно заполните вашу дату рождения в верхнем блоке.');
        return;
    }
    if (!validateDate(otherDate)) {
        alert('Введите корректную дату партнёра в формате ДД.ММ.ГГГГ.');
        return;
    }

    const numFromDate = (dateStr) => {
        const [d, m, y] = dateStr.split('.').map(Number);
        return reduceToSingleDigit(d + m + y);
    };

    const n1 = numFromDate(userDate);
    const n2 = numFromDate(otherDate);
    const diff = Math.abs(n1 - n2);

    let level;
    if (diff <= 1) {
        level = 'Очень гармоничная';
    } else if (diff <= 3) {
        level = 'Хорошая';
    } else {
        level = 'Кармнически напряжённая';
    }

    const base = 100 - diff * 10;
    const clamp = (v) => Math.max(10, Math.min(100, v));

    const friendship = clamp(base - 5);
    const work      = clamp(base);
    const love      = clamp(base - 10);

    const friendshipText =
        diff <= 1
            ? "С этим человеком легко дружить, вы быстро находите общий язык и чувствуете поддержку."
            : diff <= 3
            ? "Дружба строится на взаимном уважении, но важно учитывать различия характеров."
            : "Дружба может быть нестабильной, но даёт много уроков о границах и честности.";

    const workText =
        diff <= 1
            ? "Отличная командная работа, вы естественно дополняете сильные стороны друг друга."
            : diff <= 3
            ? "В работе вы можете быть полезны друг другу, если роли и задачи распределены честно."
            : "На работе возможны конфликты подходов, важно заранее договориться о правилах и ответственности.";

    const loveText =
        diff <= 1
            ? "В отношениях много естественной близости, притяжения и ощущения «родной души»."
            : diff <= 3
            ? "Любовь возможна глубокая, но потребует терпения, уважения различий и умения договариваться."
            : "Любовь здесь — сильный урок: много страсти, но также проверка на зрелость и умение отпускать.";

    const el = document.getElementById('compResult');
    el.innerHTML = `
        <div class="result-title">${level} совместимость</div>
        <div class="result-number">Ваше число: ${n1} | Партнёр: ${n2}</div>
        <div class="compat-bars">
            <div class="compat-row">
                <div class="compat-label">Дружба</div>
                <div class="compat-bar"><div class="compat-fill" id="friendFill"></div></div>
                <div>${friendship}%</div>
            </div>
            <div class="compat-row">
                <div class="compat-label">Работа</div>
                <div class="compat-bar"><div class="compat-fill" id="workFill"></div></div>
                <div>${work}%</div>
            </div>
            <div class="compat-row">
                <div class="compat-label">Любовь</div>
                <div class="compat-bar"><div class="compat-fill" id="loveFill"></div></div>
                <div>${love}%</div>
            </div>
        </div>
        <div class="result-meaning" style="margin-top:8px;">
            <strong>Дружба:</strong> ${friendshipText}<br>
            <strong>Работа:</strong> ${workText}<br>
            <strong>Любовь:</strong> ${loveText}
        </div>
    `;
    el.classList.add('show');

    requestAnimationFrame(() => {
        document.getElementById('friendFill').style.width = friendship + '%';
        document.getElementById('workFill').style.width   = work + '%';
        document.getElementById('loveFill').style.width   = love + '%';
    });
}

// маска для дат
function initDateMasks() {
    const inputs = document.querySelectorAll('input[type="text"]:not(#userName):not([disabled])');
    inputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 8) v = v.slice(0, 8);
            if (v.length >= 3 && v.length <= 4) {
                v = v.slice(0, 2) + '.' + v.slice(2);
            } else if (v.length >= 5) {
                v = v.slice(0, 2) + '.' + v.slice(2, 4) + '.' + v.slice(4);
            }
            e.target.value = v;
        });
    });
}

// init
window.addEventListener('DOMContentLoaded', () => {
    createStars();
    createParticles();
    initDateMasks();
    const userBirth = document.getElementById('userBirth');
    if (userBirth) userBirth.focus();
});
