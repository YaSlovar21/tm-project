const canonicalURL = "https://www.termoblok.ru";
const dateNow = (new Date()).toString();

const specPages = [
    {
      type: "construction",
        templateParameters: {
          canonicalURL: canonicalURL,
          isGkh: true,
          articleFile: "teploizol.html",
          bannerImg: "ti13front-with-izol.png",
          poster: "teploizol.png",
        },
        title: "Теплоизоляция теплообменников, изоляция пластинчатых теплообменников",
        heading: "Теплоизоляция теплообменников",
        intro: "Предлагаем теплоизоляцию разработанную под линейку отечественных пластинчатых разборных теплообменников Теплохит (ТИ).",
        meta: {
          keywords: "теплоизоляция теплообменников, изоляция теплообменников",
          description: "Теплоизоляционные чехлы для пластинчатых теплообменников, разработанные под линейку теплообменников Теплохит.",
        },
        template: "./src/blogspec-page-abstract.html",
        filename: "plastinchatye-teploobmenniki/teploizolyaciya.html",
        chunks: ["blogSpecPage", "all", "map"],
      },
      {
        type: "construction",
        templateParameters: {
          canonicalURL: canonicalURL,
          isGkh: true,
          articleFile: "plastina.html",
          poster: "plast-page-pto.png",
        },
        title: "Пластины пластинчатого теплообменника",
        heading: "Пластина пластинчатого теплообменника",
        intro: "Пластины пластинчатых теплообменников, 100% локализация производства.",
        meta: {
          keywords: "пластина пластинчатого теплообменника",
          description: "Конструктивные особенности пластины пластинчатого теплообменника. Эффективность пластины. Теплообмен.",
        },
        template: "./src/blogspec-page-abstract.html",
        filename: "plastinchatye-teploobmenniki/plastina-plastinchatogo-teploobmennika.html",
        chunks: ["blogSpecPage", "all", "map"],
      },
      {
        type: "construction",
        templateParameters: {
          canonicalURL: canonicalURL,
          isGkh: true,
          articleFile: "uplotnenie.html",
          poster: "uplot.png",
        },
        title: "Уплотнения для теплообменника",
        heading: "Уплотнение пластинчатого теплообменника",
        intro: "Уплотнения резиновые для пластинчатых теплообменников от производителя.",
        meta: {
          keywords: "уплотнение пластинчатого теплообменника",
          description: "Конструктивные особенности уплотнения пластинчатого теплообменника. Эффективность. Теплообмен.",
        },
        template: "./src/blogspec-page-abstract.html",
        filename: "plastinchatye-teploobmenniki/uplotnenie-plastinchatogo-teploobmennika.html",
        chunks: ["blogSpecPage", "all", "map"],
      },
      {
        type: "production",
        templateParameters: {
          canonicalURL: canonicalURL,
          isGkh: true,
          articleFile: "payanii.html",
          bannerImg: "payan/payanii-main.png",
        },
        title: "Паяные пластинчатые теплообменники Российского производства",
        heading: "Паяные пластинчатые теплообменники",
        intro: "Паяные теплообменники Российского производства",
        meta: {
          keywords: "паяные теплообменники, паяный теплообменник, паяный пластинчатый теплообменник",
          description: "Запуск производствао полностью Российского паяного пластинчатого теплообменника. Процессы производства паяного теплообменника. Типоразмеры теплообменников.",
        },
        template: "./src/blogspec-page-abstract.html",
        filename: "plastinchatye-teploobmenniki/plastinchatye-payanye-teploobmenniki/index.html",
        chunks: ["vakansii", "blogSpecPage", "all", "map"],
      },
      {
        type: "production",
        templateParameters: {
          canonicalURL: canonicalURL,
          isGkh: true,
          articleFile: "harakteristiki.html",
        },
        title: "Характеристики пластинчатого теплообменника",
        heading: "Характеристики пластинчатых теплобменников",
        intro: "Технические характеристики конструкции теплообменных аппаратов, технические условия и параметры для расчёта.",
        meta: {
          keywords: "характеристики пластинчатого теплообменника",
          description: "Технические характеристики пластинчатых теплообменников: максимальное рабочее давление, площадь теплообмена, толщина пластины, условный проход (ду) и прочее.",
        },
        template: "./src/blogspec-page-abstract.html",
        filename: "plastinchatye-teploobmenniki/harakteristiki-plastinchatogo-teploobmennika.html",
        chunks: ["blogSpecPage", "all", "map"],
      },
      {
        type: "service",
        templateParameters: {
          canonicalURL: canonicalURL,
          isGkh: true,
          articleFile: "promyvka.html",
          poster: "wash.png",
        },
        title: "Промывка пластинчатого теплообменника",
        heading: "Промывка теплообменника",
        intro: "Как правильно осуществлять промывку разборного пластинчатого теплообменника, какими средствами. Нюансы.",
        meta: {
          keywords: "промывка пластинчатого теплообменника",
          description: "Рекомендации по промывке пластинчатого теплообменника от производителя: виды загрязнений, способы промывки, средства промывки.",
        },
        template: "./src/blogspec-page-abstract.html",
        filename: "plastinchatye-teploobmenniki/promyvka-teploobmennika.html",
        chunks: ["blogSpecPage", "all", "map"],
      },
      {
        type: "construction",
        templateParameters: {
          canonicalURL: canonicalURL,
          isGkh: true,
          articleFile: "princip.html",
          poster: "princip.png",
        },
        title: "Пластинчатый теплообменник: принцип работы и устройство",
        heading: "Принцип работы пластинчатого теплообменника",
        intro: "Работа и устройство пластинчатого теплообменника. Как устроен пластинчатый теплообменник? Основной принцип работы пластинчатого теплообменника.",
        meta: {
          keywords: "принцип работы пластинчатого теплообменника, устройство пластинчатого теплообменника",
          description: "Основной принцип работы пластинчатого теплообменника, схемы и особенности устройства. Пластинчатый теплообменник устроен таким образом, что смешения сред не происходит.",
        },
        template: "./src/blogspec-page-abstract.html",
        filename: "plastinchatye-teploobmenniki/princip-raboty-i-ustrojstvo.html",
        chunks: ["blogSpecPage", "all", "map"],
      },
      {
        type: "service",
        templateParameters: {
          canonicalURL: canonicalURL,
          isGkh: true,
          articleFile: "montazh.html",
          poster: "montazh.png",
        },
        title: "Монтаж пластинчатого теплообменника, ввод в эксплуатацию теплообменного аппрата",
        heading: "Монтаж пластинчатого теплообменника",
        intro:
          "Как осуществляется монтаж теплообменного аппарата? Особенности монтажа пластинчатых теплообменников. Важные моменты на что нужно обратить внимание при монтаже, запуске теплообменного аппарата.",
        meta: {
          keywords: "монтаж пластинчатого теплообменника, монтаж теплобменника, монтаж теплообменного аппарата",
          description: "Как правильно выполнить монтаж пластинчатого теплообменного аппарата и запустить теплообменник в работу? Важные моменты, которые нужно учесть при монтаже теплообменника.",
        },
        template: "./src/blogspec-page-abstract.html",
        filename: "plastinchatye-teploobmenniki/montazh-teploobmennika.html",
        chunks: ["blogSpecPage", "all", "map"],
      },
      {
        type: "production",
        templateParameters: {
          canonicalURL: canonicalURL,
          isGkh: true,
          articleFile: "programma.html",
        },
        title: "Программа расчёта пластинчатого теплообменника",
        heading: "Программа расчёта пластинчатого теплообменника",
        intro:
          "Программа подбора и расчёта теплообменников на базе теплообменных пластин ТИ",
        meta: {
          keywords: "монтаж пластинчатого теплообменника, монтаж теплобменника, монтаж теплообменного аппарата",
          description: "Вы можете скачать программу расчёта теплообменников.",
        },
        template: "./src/blogspec-page-abstract.html",
        filename: "plastinchatye-teploobmenniki/programma-rascheta.html",
        chunks: ["blogSpecPage", "all", "map"],
      },
      {
        type: "service",
        templateParameters: {
          canonicalURL: canonicalURL,
          isGkh: true,
          articleFile: "remont.html",
          poster: "remont.png",
        },
        title: "Как осуществить ремонт пластинчатого теплообменника правильно",
        heading: "Ремонт пластинчатого теплообменника",
        intro: "Советы по ремонту пластинчатых теплообменников от завода производителя.",
        meta: {
          keywords: "ремонт пластинчатого теплообменника, ремонт теплобменника, ремонт теплообменного аппарата",
          description: "На каждый возможный вид неисправности мы предлагаем алгоритм действий по ремонту пластинчатого теплообменника. Советы от завода по производству пластинчатых теплообменников.",
        },
        template: "./src/blogspec-page-abstract.html",
        filename: "plastinchatye-teploobmenniki/remont-plastinchatogo-teploobmennika.html",
        chunks: ["blogSpecPage", "all", "map"],
      },
      {
        type: "production",
        templateParameters: {
          canonicalURL: canonicalURL,
          isGkh: true,
          articleFile: "anewplast.html",
        },
        title: "Разработка и запуск в производство пластины теплообменника",
        heading: "Разработка и запуск в производство пластины теплообменника",
        intro: "Изобретение новой пластины для пластинчатого теплообменника: разработка технологического процесса, изготовление остнастки, адаптация алгоритма для расчёта теплообменника и запуск в производство.",
        meta: {
          keywords: "производство пластин теплообменников в россии",
          description: "Запуск в производство новой пластины для пластинчатого теплообменника. Локализация производства пластинчатых теплообменников и расширение типоразмерного ряда теплообменников в России",
        },
        template: "./src/blogspec-page-abstract.html",
        filename: "plastinchatye-teploobmenniki/novaya-rossijskaya-plastina-teploobmennika.html",
        chunks: ["blogSpecPage", "all", "map"],
      },
      {
        type: "production",
        templateParameters: {
          canonicalURL: canonicalURL,
          isGkh: true,
          articleFile: "poddony.html",
          poster: "poddon-nerzh.png",
        },
        title: "Поддоны для теплообменников пластинчатых из нержавеющей стали",
        heading: "Поддоны для теплообменников из нержавеющей стали",
        intro: "",
        meta: {
          keywords: "поддоны под теплообменник из нержавеющей стали",
          description: "",
        },
        template: "./src/blogspec-page-abstract.html",
        filename: "plastinchatye-teploobmenniki/poddony-iz-nerzhaveyushchej-stali.html",
        chunks: ["blogSpecPage", "all", "map"],
      },
      
];

const specPagesTypes = {
  "production": "Продукция",
  "service": "Эксплуатация",
  "construction": "Конструкция теплообменника"
}

module.exports = {
  specPages,
  specPagesTypes,
  dataSpecPagesForSitemap: specPages.map(i=> ({
    path: `/${i.filename}`, //'/catalog/ti-09.html',
    lastmod: dateNow,
    priority: 0.9,
    changefreq: 'monthly'
  }))
}