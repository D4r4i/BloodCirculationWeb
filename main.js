isClicked = false;
inputs = ["#sd", "#dd", "#bpm", "#weight", "#age", "#height", "#sex"]

let performData = function() {
    if (variablesExam()) {
        for (let i = 0; i < inputs.length; i++) {
            document.querySelector(inputs[i]).style.background = "#ffffff";
        }
        document.querySelector('#error').style.height = 0;
        document.querySelector('#error').style.margin = 0;
        document.querySelector('.error-message').style.transition = "0.2s";
        document.querySelector('.error-message').style.opacity = 0;
        moveTable();
        setTimeout(show, 1100);
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
    sex = document.getElementById("sex").value;
    drug = document.getElementById("drug").checked;

    // console.log("---------")
    // console.log(sd);
    // console.log(dd);
    // console.log(bpm);
    // console.log(weight);
    // console.log(age);
    // console.log(height);
    // console.log(sex);
    // console.log(drug);
    // console.log("---------")

    errors = [];
    exam = true;

    if (sd == '' || isNaN(sd) || 90 > parseInt(sd) || parseInt(sd) > 250){  
        errors.push("#sd")
        exam = false;
    } 

    if (dd == '' || isNaN(dd) || 60 > parseInt(dd) || parseInt(dd) > 140) {
        errors.push("#dd")
        exam = false;
    }
    
    if (bpm == '' || isNaN(bpm) || 40 > parseInt(bpm) || parseInt(bpm) > 180) {
        errors.push("#bpm")
        exam = false;
    }
    
    if (weight == '' || isNaN(weight) || 40 > parseInt(weight)) {
        errors.push("#weight")
        exam = false;
    }
    
    if (age == '' || isNaN(age) || 14 > parseInt(age) || parseInt(age) > 90) {
        errors.push("#age")
        exam = false;
    }
    
    if (height == '' || isNaN(height) || 150 > parseInt(height) || parseInt(height) > 205) {
        errors.push("#height")
        exam = false;
    }
    
    if (sex == "none") {
        errors.push("#sex")
        exam = false;
    }

    // console.log(errors)

    for (let i = 0; i < errors.length; i++) {
        document.querySelector(errors[i]).style.background = "#ffc6c6";
    }
    return exam
}

let moveTable = function() {
    if(!isClicked){
        document.querySelector('#but').textContent = 'Ввести другие значения';
        document.querySelector('#data-plate').style.width = "1000px";
        isClicked = true;
    }
    else{
        document.querySelector('#but').textContent = 'Ввод';
        document.querySelector('#data-plate').style.width = "0";

        document.getElementById("sd").value = '';
        document.getElementById("dd").value = '';
        document.getElementById("bpm").value = '';
        document.getElementById("weight").value = '';
        document.getElementById("age").value = '';
        document.getElementById("height").value = '';
        document.getElementById("sex").value = "none";
        document.getElementById("drug").checked = false;

        document.querySelector("#top1").innerHTML = "";
        document.querySelector("#bot1").innerHTML = "";
        document.querySelector("#top2").innerHTML = "";
        document.querySelector("#bot2").innerHTML = "";
        document.querySelector("#top3").innerHTML = "";
        document.querySelector("#bot31").innerHTML = "";
        document.querySelector("#bot32").innerHTML = "";

        isClicked = false;
    }
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
    
    if (vsex == "man") {
        DOCK = Math.round(weight * height / 2.36)  // Должный объем циркулирующей крови
    }
    else {
        DOCK = Math.round(weight * height / 1.838)
    }
    OtklOCK = Math.round((OCK / DOCK - 1) * 100)  // Отклонение ОЦК

    console.log(pd, so, MOK_TEK, MOK_DOLZH, MOK_PERCENT, Tsc, Tp, IMOK, VI, BMI, OCK, DOCK, OtklOCK, drug)

    document.querySelector("#top1").innerHTML = "Отклонение объема циркулирующей крови: " + OtklOCK + "%";
    if (-10 <= OtklOCK && OtklOCK <= 10) {
        document.querySelector("#bot1").innerHTML = "Нормоволемия - оптимальное кровообращение";
    }
    else if (OtklOCK > 10) {
        document.querySelector("#bot1").innerHTML = "Гиперволемия - рекомендуется применение тиазидных диуретиков";
    }
    else if (OtklOCK < -10) {
        if (70 <= MOK_PERCENT && MOK_PERCENT <= 130) {
            document.querySelector("#bot1").innerHTML = "Гиповолемия - рекомендуется наблюдение в динамике. Рекомендуется применение осмотического диуретика(лист толокнянки или трава хвоща полевого).";
        }
        else {
            document.querySelector("#bot1").innerHTML = "Гиповолемия - рекомендуется применение осмотического диуретика(лист толокнянки или трава хвоща полевого).";
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
            document.querySelector("#bot31").innerHTML = "Ввиду высокого систолического давления и большого значения систолического объема рекомендуются следующие лекарственные препараты";
            document.querySelector("#bot32").innerHTML = "Блокирование α(альфа) 1 рецепторов: Доксазозин\nАПФ ингибитор: Каптоприл\nАПФ рецептор: Лозартан";
        }
        else {

        }
    }
    else if (MOK_PERCENT > 130) {

    }
    // if 70 <= MOK_PERCENT <= 130:
    // if bpm <= 60 and VI < -10:
    //     bot.send_message(message.chat.id, f'Минутный объем крови в норме: {round(MOK_PERCENT, 2)}%\n\n'
    //                                       f'Ввиду высокого систолического давления и большого значения '
    //                                       f'систолического объема рекомендуются лекарственные препараты:\n\n'
    //                                       f'Блокирование α(альфа) 1 рецепторов:\nДоксазозин\n\n'
    //                                       f'АПФ ингибитор:\nКаптоприл\n\n'
    //                                       f'АПФ рецептор:\nЛозартан\n\n'
    //                                       f'Предлагаемые рекомендации лекарственных препаратов требуют '
    //                                       f'согласования со специалистом.')
    // else:
    //     bot.send_message(message.chat.id, f'Минутный объем крови в норме: {round(MOK_PERCENT, 2)}%')
}