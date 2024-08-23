isClicked = false;
inputs = ["#sd", "#dd", "#bpm", "#weight", "#age", "#height", "#sex"]
let bot3 = "";

let performData = function() {
    if (variablesExam()) {
        for (let i = 0; i < inputs.length; i++) {
            document.querySelector(inputs[i]).style.background = "#ffffff";
        }
        document.querySelector('#error').style.height = 0;
        document.querySelector('#error').style.margin = 0;
        document.querySelector('.error-message').style.transition = "0.2s";
        document.querySelector('.error-message').style.opacity = 0;

        document.querySelector('.enter-inp2').style.display = "inline-block";
        document.querySelector('.enter-inp').style.marginRight = "6px";

        if (!isClicked) {
            document.querySelector('.enter-inp').textContent = 'Сброс';
            isClicked = true;
            show();
        }
        else {
            document.querySelector('#but').textContent = 'Ввод';

            document.getElementById("sd").value = '';
            document.getElementById("dd").value = '';
            document.getElementById("bpm").value = '';
            document.getElementById("weight").value = '';
            document.getElementById("age").value = '';
            document.getElementById("height").value = '';

            document.getElementById("sex").value = "none";
            document.querySelector(".new-select").innerHTML = "Пол";
            document.querySelector(".new-select").style.color = "Gray";

            document.getElementById("drug").checked = false;

            document.querySelector("#bot1").innerHTML = "";
            document.querySelector("#bot2").innerHTML = "";
            document.querySelector("#bot3").innerHTML = "";

            document.querySelector("#top1").innerHTML = "Отклонение объема циркулирующей крови:";
            document.querySelector("#top2").innerHTML = "Индекс массы тела:";
            document.querySelector("#top3").innerHTML = "Минутный объем крови:";

            document.querySelector('.enter-inp2').style.display = "none";
            document.querySelector('.enter-inp').style.marginRight = "auto";

            document.querySelector("#pd-data").innerHTML = "";
            document.querySelector("#so-data").innerHTML = "";
            document.querySelector("#MT-data").innerHTML = "";
            document.querySelector("#MD-data").innerHTML = "";
            document.querySelector("#MP-data").innerHTML = "";
            document.querySelector("#Tsc-data").innerHTML = "";
            document.querySelector("#Tp-data").innerHTML = "";
            document.querySelector("#IMOK-data").innerHTML = "";
            document.querySelector("#VI-data").innerHTML = "";
            document.querySelector("#BMI-data").innerHTML = "";
            document.querySelector("#OCK-data").innerHTML = "";
            document.querySelector("#DOCK-data").innerHTML = "";
            document.querySelector("#OtklOCK-data").innerHTML = "";

            isClicked = false;
        }
    }
    else {
        document.querySelector('#error').style.height = "77px";
        document.querySelector('#error').style.transition = "0.5s";
        document.querySelector('#error').style.marginBottom = "12px";
        document.querySelector('.error-message').style.height = "fit-content";
        document.querySelector('.error-message').style.transition = "3s";
        document.querySelector('.error-message').style.opacity = 1;
        
    }
}

let secondBut = function() {
    if (variablesExam()) {
        for (let i = 0; i < inputs.length; i++) {
            document.querySelector(inputs[i]).style.background = "#ffffff";
        }
        document.querySelector('#error').style.height = 0;
        document.querySelector('#error').style.margin = 0;
        document.querySelector('.error-message').style.transition = "0.2s";
        document.querySelector('.error-message').style.opacity = 0;
        show();
    }
    else {
        document.querySelector('#error').style.height = "77px";
        document.querySelector('#error').style.transition = "0.5s";
        document.querySelector('#error').style.marginBottom = "12px";
        document.querySelector('.error-message').style.height = "77px";
        document.querySelector('.error-message').style.transition = "3s";
        document.querySelector('.error-message').style.opacity = 1;
    }
}

let variablesExam = function() {
    sd = document.getElementById("sd").value;
    dd = document.getElementById("dd").value;
    bpm = document.getElementById("bpm").value;
    weight = document.getElementById("weight").value;
    age = document.getElementById("age").value;
    height = document.getElementById("height").value;
    sex = document.querySelector(".new-select").innerHTML;
    drug = document.getElementById("drug").checked;

    errors = [];
    exam = true;

    if (sd === '' || isNaN(sd) || 80 > parseInt(sd) || parseInt(sd) > 250){
        errors.push("#sd")
        exam = false;
    } 

    if (dd === '' || isNaN(dd) || 50 > parseInt(dd) || parseInt(dd) > 140) {
        errors.push("#dd")
        exam = false;
    }
    
    if (bpm === '' || isNaN(bpm) || 40 > parseInt(bpm) || parseInt(bpm) > 180) {
        errors.push("#bpm")
        exam = false;
    }
    
    if (weight === '' || isNaN(weight) || 40 > parseInt(weight)) {
        errors.push("#weight")
        exam = false;
    }
    
    if (age === '' || isNaN(age) || 14 > parseInt(age) || parseInt(age) > 90) {
        errors.push("#age")
        exam = false;
    }
    
    if (height === '' || isNaN(height) || 150 > parseInt(height) || parseInt(height) > 205) {
        errors.push("#height")
        exam = false;
    }
    document.querySelector(".new-select").style.background = "#ffffff"
    if (sex === "Пол") {
        errors.push("#sex")
        exam = false;
        document.querySelector(".new-select").style.background = "#f7dae2";
    }


    for (let i = 0; i < inputs.length; i++) {
        document.querySelector(inputs[i]).style.background = "#ffffff";
    }

    for (let i = 0; i < errors.length; i++) {
        document.querySelector(errors[i]).style.background = "#f7dae2";
    }
    return exam
}

let show = function() {
    sd = parseInt(document.getElementById("sd").value);
    dd = parseInt(document.getElementById("dd").value);
    bpm = parseInt(document.getElementById("bpm").value);
    weight = parseInt(document.getElementById("weight").value);
    age = parseInt(document.getElementById("age").value);
    height = parseInt(document.getElementById("height").value);
    vsex = document.getElementById("sex").value;
    drug = document.getElementById("drug").checked;
    
    pd = sd - dd  // Пульсовое давление

    so = Math.round((90.97 + 0.54 * pd - 0.57 * dd - 0.61 * age) * 100) / 100  // Систолический объем

    MOK_TEK = Math.round((so * bpm / 1000) * 100) / 100

    MOK_DOLZH = Math.round((0.11 * Math.pow(weight, 3 / 4)) * 100) / 100

    MOK_PERCENT = Math.round((MOK_TEK / MOK_DOLZH * 100) * 100) / 100

    Tsc = Math.round((60 / bpm) * 100) / 100  // Период сердечного цикла

    Tp = Math.round((Tsc * 0.109 + 0.159) * 100) / 100  // Период изгнания

    IMOK = Math.round(((sd + dd) * Tp / dd / (Tsc - Tp)) * 100) / 100  // Индекс текущего объема крови

    VI = Math.round(((1 - dd / bpm) * 100) * 100) / 100  // Вегетативный индекс Кердо

    BMI = Math.round((weight / ((height / 100) ** 2)) * 100) / 100  // Индекс массы тела

    OCK = Math.round(MOK_TEK / IMOK * 1000)  // ОЦК - Объем циркулирующей крови
    
    if (vsex === "man") {
        DOCK = Math.round(weight * height / 2.36)  // Должный объем циркулирующей крови
    }
    else {
        DOCK = Math.round(weight * height / 1.838)
    }
    OtklOCK = Math.round((OCK / DOCK - 1) * 100)  // Отклонение ОЦК


    document.querySelector("#top1").innerHTML = "Отклонение объема циркулирующей крови: " + OtklOCK + "%";
    if (-10 <= OtklOCK && OtklOCK <= 10) {
        document.querySelector("#bot1").innerHTML = "Нормоволемия - оптимальное кровообращение";
    }
    else if (OtklOCK > 10) {
        document.querySelector("#bot1").innerHTML = "Гиперволемия";
    }
    else if (OtklOCK < -10) {
        if (70 <= MOK_PERCENT && MOK_PERCENT <= 130) {
            document.querySelector("#bot1").innerHTML = "Гиповолемия - рекомендуется наблюдение в динамике.";
        }
        else {
            document.querySelector("#bot1").innerHTML = "Гиповолемия - рекомендуется консультация специалиста";
        }
    }


    document.querySelector("#top2").innerHTML = "Индекс массы тела: " + BMI;
    if (BMI <= 16) {
        document.querySelector("#bot2").innerHTML = "Выраженный дефицит массы тела";
    }
    else if (16 < BMI && BMI <= 18.5) {
        document.querySelector("#bot2").innerHTML = "Недостаток массы тела";
    }
    else if (18.5 < BMI && BMI <= 24.9) {
        document.querySelector("#bot2").innerHTML = "Нормальная масса тела";
    }
    else if (24.9 < BMI && BMI <= 30) {
        document.querySelector("#bot2").innerHTML = "Избыточная масса тела";
    }
    else if (30 < BMI && BMI <= 35) {
        document.querySelector("#bot2").innerHTML = "Ожирение I степени";
    }
    else if (35 < BMI && BMI <= 40) {
        document.querySelector("#bot2").innerHTML = "Ожирение II степени";
    }
    else if (40 < BMI) {
        document.querySelector("#bot2").innerHTML = "Ожирение III степени";
    }


    if (70 <= MOK_PERCENT && MOK_PERCENT <= 130) {
        if (bpm <= 60 && VI < -10) {
            document.querySelector("#top3").innerHTML = "Минутный объем крови в норме: " + MOK_PERCENT + "%";
            document.querySelector("#bot3").innerHTML = "Ввиду высокого систолического давления и большого значения систолического объема рекомендуются консультация специалиста";
            bot3 = "3.1.txt";
        }
        else {
            document.querySelector("#top3").innerHTML = "Минутный объем крови в норме: " + MOK_PERCENT + "%";
        }
    }
    else if (MOK_PERCENT > 130) {
        document.querySelector("#top3").innerHTML = "Минутный объем крови: " + MOK_PERCENT + "%";
        MOK_MESSAGE = "";

        if (OtklOCK < -10) {
            MOK_MESSAGE += "Неполная компенсаторная реакция. Гиповолемия. Ситуация требует снижения влияния симпатической нервной системы, улучшения микроциркуляции.";
            bot3 = "3.2.txt";
        }
        else if (-10 <= OtklOCK && OtklOCK <= 10) {
            MOK_MESSAGE += "Компенсаторная реакция ССС. "
            bot = "3.3.txt";
        }
        else if (10 < OtklOCK) {
            MOK_MESSAGE += "Адаптационная реакция на предполагаемую физическую или психоэмоциональную нагрузку. Ситуация требует снижения влияния симпатической нервной системы, уменьшения сократимости миокарда и частоты сердечных сокращений, снижения объема циркулирующей крови. Рекомендуется принятие решения о выборе лекарственных препаратов после рассмотрения конкретной ситуации специалистом.";
            bot3 = "3.4.txt";
        }

        document.querySelector("#bot3").innerHTML = MOK_MESSAGE;
    }
    else if (MOK_PERCENT < 70) {
        otklEx = false;
        document.querySelector("#top3").innerHTML = "Минутный объем крови: " + MOK_PERCENT + "%";
        MOK_MESSAGE = "";
        if (OtklOCK < -10) {
            MOK_MESSAGE += "Тенденция к централизации кровообращения. Ситуация требует снижения объема циркулирующей крови, профилактики спазма сосудов, уменьшения переферического сопротивления.";
            otklEx = true;
        }

        MOK_MESSAGE += "Рекомендуется ЭКГ и АД мониторинг в динамике. ";    

        if (drug = true) {
            MOK_MESSAGE += "В зависимости от результатов необходимо сделать следующее: Если рзультат ЭКГ положительный: рекомендуется подбор адекватной терапии. Если результат ЭКГ отрицательный: рекомендуется развернутая схема диагностики сердечно-сосудистой системы.";
            bot3 = "3.5";
        }
        else {
            MOK_MESSAGE += "В зависимости от результатов необходимо сделать следующее: Если результат ЭКГ положительный: рекомендуется коррекция терапии. Если результат ЭКГ отрицательный: рекомендуется развернутая схема диагностики сердечно-сосудистой системы.";
            bot3 = "3.6";
        }
        if (otklEx) {
            bot3 = bot3 + ".1.txt";
        }
        document.querySelector("#bot3").innerHTML = MOK_MESSAGE;
    }

    showResults(pd, so, MOK_TEK, MOK_DOLZH, MOK_PERCENT, Tsc, Tp, IMOK, VI, BMI, OCK, DOCK, OtklOCK);
}

let showResults = function(pd, so, MOK_TEK, MOK_DOLZH, MOK_PERCENT, Tsc, Tp, IMOK, VI, BMI, OCK, DOCK, OtklOCK) {
    document.querySelector("#pd-data").innerHTML = pd;
    document.querySelector("#so-data").innerHTML = so;
    document.querySelector("#MT-data").innerHTML = MOK_TEK;
    document.querySelector("#MD-data").innerHTML = MOK_DOLZH;
    document.querySelector("#MP-data").innerHTML = MOK_PERCENT;
    document.querySelector("#Tsc-data").innerHTML = Tsc;
    document.querySelector("#Tp-data").innerHTML = Tp;
    document.querySelector("#IMOK-data").innerHTML = IMOK;
    document.querySelector("#VI-data").innerHTML = VI;
    document.querySelector("#BMI-data").innerHTML = BMI;
    document.querySelector("#OCK-data").innerHTML = OCK;
    document.querySelector("#DOCK-data").innerHTML = DOCK;
    document.querySelector("#OtklOCK-data").innerHTML = OtklOCK;

    saveHistory();
}

function saveHistory() {
    let userId = 0;
    data = " ";

    const sd = document.getElementById("sd").value;
    const dd = document.getElementById("dd").value;
    const bpm = document.getElementById("bpm").value;
    const weight = document.getElementById("weight").value;
    const age = document.getElementById("age").value;
    const height = document.getElementById("height").value;
    const sex = document.getElementById("sex").value === "man" ? "мужчина" : "женщина";
    const drug = document.getElementById("drug").checked ? "да" : "нет";

    const top1 = document.getElementById("top1").innerHTML;
    const bot1 = document.getElementById("bot1").innerHTML;
    const top2 = document.getElementById("top2").innerHTML;
    const bot2 = document.getElementById("bot2").innerHTML;
    const top3 = document.getElementById("top3").innerHTML;

    const DBdata = {
        userId: userId,
        age: age,
        bot1: bot1,
        bot2: bot2,
        bot3: bot3,
        bpm: bpm,
        data: data,
        dd: dd,
        drug: drug,
        height: height,
        sd: sd,
        sex: sex,
        top1: top1,
        top2: top2,
        top3: top3,
        weight: weight
    }

    const jsonData = JSON.stringify(DBdata);

    fetch('/history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    }).then(response => {

    })
}

$('.select').each(function() {
    const _this = $(this),
        selectOption = _this.find('option'),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(':selected'),
        duration = 250; // длительность анимации

    _this.hide();
    _this.wrap('<div class="select"></div>');
    $('<div>', {
        class: 'new-select',
        text: _this.children('option:disabled').text()
    }).insertAfter(_this);

    const selectHead = _this.next('.new-select');
    $('<div>', {
        class: 'new-select__list'
    }).insertAfter(selectHead);

    const selectList = selectHead.next('.new-select__list');
    for (let i = 1; i < selectOptionLength; i++) {
        $('<div>', {
            class: 'new-select__item',
            html: $('<span>', {
                text: selectOption.eq(i).text()
            })
        })
            .attr('data-value', selectOption.eq(i).val())
            .appendTo(selectList);
    }

    const selectItem = selectList.find('.new-select__item');
    selectList.slideUp(0);
    selectHead.on('click', function() {
        if ( !$(this).hasClass('on') ) {
            $(this).addClass('on');
            selectList.slideDown(duration);

            selectItem.on('click', function() {
                let chooseItem = $(this).data('value');

                $('select').val(chooseItem).attr('selected', 'selected');
                selectHead.text( $(this).find('span').text() );
                document.querySelector(".new-select").style.color = "black";

                selectList.slideUp(duration);
                selectHead.removeClass('on');
            });

        } else {
            $(this).removeClass('on');
            selectList.slideUp(duration);
        }
    });
});

// const opt = document.querySelector('.new-select');
// if (opt.value === 'man' || opt.value === 'woman') {
//     // opt.style.color = "black";
//     document.querySelector(".new-select").style.color = "black";
// }
// console.log(opt.text);
