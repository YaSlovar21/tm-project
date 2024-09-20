const tis = [
     /*---------------------ТЕПЛООБМЕННИКИ------------------------------------------*/
     {
        title: "Теплообменник ТИ025 пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/ti-025.html",
        templateParameters: {
          du: [25, 32, 40 ],
          tialias: "ti025.png",
          drawalias: "draw025.jpg",
          heading: "ТИ 025",
          headingAlias: "ТИ025",
          description: `ТИ025 – имеет широкую гамму подключения патрубков: Ду20, Ду25, Ду32, Ду40. Применение: небольшие промышленные помещения, коттеджи, здания детских садов, подогрев бассейнов, обогрев гаражных помещений.`,
          link3d: "https://disk.yandex.ru/d/Lo1bdjAoi7LVyQ",
        },
        chunks: ["ti", "all"],
      } /*--2-------ТИ077----------- */,
      {
        title: "Теплообменник ТИ077 пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/ti-077.html",
        templateParameters: {
          du: [25, 32, 40 ],
          tialias: "ti077.png",
          drawalias: "draw077.jpg",
          heading: "ТИ 077",
          headingAlias: "ТИ077",
          description: `ТИ077 – имеет широкую гамму подключения патрубков: Ду25, Ду32, Ду40. 
            Подходит для задач ЖКХ на типовые 5ти этажные дома.
            Типоразмер также часто применяется в пищевой отрасли. (в т.ч. в многоступенчатом исполнении)`,
          link3d: "https://disk.yandex.ru/d/kEiGbHo7Fi8Uwg",
        },
        chunks: ["ti", "all"],
      }, 
      {
        title: "Теплообменник ТИ09 пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/ti-09.html",
        templateParameters: {
          du: [32, 40, 50],
          tialias: "ti09.png",
          drawalias: "_draw09.png",
          caption: "NEW",
          heading: "ТИ 09",
          headingAlias: "ТИ09",
          description: `ТИ09 – имеет широкую гамму подключения патрубков: Ду32, Ду40, Ду50. 
            Новый теплообменник на базе гофрированной пластины нового типоразмера.`,
        },
        chunks: ["ti", "all"],
      }, 
      {
        title: "Теплообменник ТИ12 пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/ti-12.html",
        templateParameters: {
          du: [32, 40, 50],
          tialias: "ti12.png",
          drawalias: "_draw12.png",
          caption: "NEW",
          heading: "ТИ 12",
          headingAlias: "ТИ12",
          description: `ТИ12 – имеет широкую гамму подключения патрубков: Ду32, Ду40, Ду50. 
            Новый теплообменник на базе гофрированной пластины нового типоразмера.`,
        },
        chunks: ["ti", "all"],
      }, 
      /*---3------ТИ13----------- */
      {
        title: "Теплообменник ТИ13 пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/ti-13.html",
        templateParameters: {
          du: [50, 65],
          tialias: "ti13.png",
          drawalias: "draw13.jpg",
          heading: "ТИ 13",
          headingAlias: "ТИ13",
          description: `ТИ13 – имеет подключения патрубков: Ду50, Ду65. 
          Применение: если ориентироваться на жилые дома, данный теплообменник подходит на типовой 4-6 подъездный 9-ти этажный жилой дом.`,
          link3d: "https://disk.yandex.ru/d/7C26Ov2CVbgl6w",
        },
        chunks: ["ti", "all"],
      } /*--4-------ТИ18-----------*/,
      {
        title: "Теплообменник ТИ18 пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/ti-18.html",
        templateParameters: {
          du: [50, 65],
          tialias: "ti18.png",
          drawalias: "draw18.jpg",
          heading: "ТИ 18",
          headingAlias: "ТИ18",
          description: `ТИ18 – имеет гамму подключения патрубков: Ду50, Ду65.
            Применение: если ориентироваться на жилые дома, данный теплообменник зачастую используются в многоквартирных высотных домах.
            Теплообменный аппарат похож на ТИ13, но в отличие от него лучше справляется с более жесткими температурными режимами`,
          link3d: "https://disk.yandex.ru/d/O2lzhXAOWaA4ug",
        },
        chunks: ["ti", "all"],
      } /*--5-------ТИ16,5-----------*/,
      {
        title: "Теплообменник ТИ16,5 пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/ti-16-5.html",
        templateParameters: {
          du: [50, 65, 80],
          tialias: "ti18.png",
          drawalias: "draw16-5.jpg",
          heading: "ТИ 16,5",
          headingAlias: "ТИ16,5",
          description: `ТИ16,5 – имеет подключение патрубков ДУ50, ДУ65, ДУ80.
          Если температурные графики не типовые (не отопление и гвс), с небольшим перепадом температур, 
          специфические среды, программа расчёта вероятно подберет данный теплообменник. 
          Зачастую он подбирается, когда требуется охладить жидкость на 1-3 градуса при небольших тепловых нагрузках`,
        },
        chunks: ["ti", "all"],
      } /*--6-------ТИ28-----------*/,
      {
        title: "Теплообменник ТИ28 пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/ti-28.html",
        templateParameters: {
          du: [100, 125],
          tialias: "ti28.png",
          drawalias: "draw28.jpg",
          heading: "ТИ 28",
          headingAlias: "ТИ28",
          description: `ТИ28 – имеет подключения патрубков: ДУ100, ДУ125.
            `,
          link3d: "https://disk.yandex.ru/d/3lo5g4MpzvYFcA",
        },
        chunks: ["ti", "all"],
      } /*--7-------ТИ45-----------*/,
      {
        title: "Теплообменник ТИ45 пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/ti-45.html",
        templateParameters: {
          du: [100, 125],
          tialias: "ti45.png",
          drawalias: "draw45.jpg",
          heading: "ТИ 45",
          headingAlias: "ТИ45",
          description: `ТИ45 – имеет подключения патрубков: ДУ100, ДУ125. 
            `,
          link3d: "https://disk.yandex.ru/d/xl08RXlp73-Bzw",
        },
        chunks: ["ti", "all"],
      } /*--8-------ТИ52-----------*/,
      {
        title: "Теплообменник ТИ52 пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/ti-52.html",
        templateParameters: {
          du: [150],
          tialias: "ti52.png",
          drawalias: "draw52.jpg",
          heading: "ТИ 52",
          headingAlias: "ТИ52",
          description: `ТИ52 – имеет подключение ДУ150.
          Применение: промышленные заводы, центральные тепловые пункты (ЦТП), центральные котельные. 
          Масштаб обогрева - микрорайоны, большие торговые и бизнес центры (крупной квадратуры от 15 000 квадратных метров и более)`,
          link3d: "https://disk.yandex.ru/d/PV1ctuxUcru8nA",
        },
        chunks: ["ti", "all"],
      } /*--9-------ТИ65-----------*/,
      {
        title: "Теплообменник ТИ65 пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/ti-65.html",
        templateParameters: {
          du: [100, 125],
          tialias: "ti65.png",
          drawalias: "draw52.jpg",
          heading: "ТИ 65",
          headingAlias: "ТИ65",
          description: `ТИ65 – имеет подключения патрубков: ДУ100, ДУ125. 
            `,
          link3d: "https://disk.yandex.ru/d/1c62zYE1I9yvyA",
        },
        chunks: ["ti", "all"],
      } /*-10-------ТИ82-----------*/,
      {
        title: "Теплообменник ТИ82 пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/ti-82.html",
        templateParameters: {
          du: [150],
          tialias: "ti82.png",
          drawalias: "draw82.jpg",
          heading: "ТИ 82",
          headingAlias: "ТИ82",
          description: `ТИ82 – имеет подключение ДУ150. В отличие от ТИ52 имеет более удлиненную пластину, что позволяет удерживать больший перепад температур.
            Применение аналогичное ТИ52: промышленные заводы, центральные тепловые пункты (ЦТП), котельные микрорайонов. 
            Зачастую применяется также в больших торговых и бизнес центрах (крупной квадратуры от 15 000 квадратных метров и более).`,
          link3d: "https://disk.yandex.ru/d/p4EH75u--S1Dzg",
        },
        chunks: ["ti", "all"],
      } /*-11-------ТИ95-----------*/,
      {
        title: "Теплообменник ТИ95 пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/ti-95.html",
        templateParameters: {
          du: [200, 250],
          tialias: "ti95.png",
          drawalias: "draw95.jpg",
          heading: "ТИ 95",
          headingAlias: "ТИ95",
          description: `ТИ95 – имеет подключения патрубков: ДУ200, ДУ250.
          Применение: ТЭЦ. (Обогревается совокупность микрорайонов)`,
          link3d: "https://disk.yandex.ru/d/rqyEmjeBzRgdZg",
        },
        chunks: ["ti", "all"],
      } /*-12-------ТИ116-----------*/,
      {
        title: "Теплообменник ТИ116 пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/ti-116.html",
        templateParameters: {
          du: [200,250],
          tialias: "ti95.png",
          drawalias: "draw116.jpg",
          heading: "ТИ 116",
          headingAlias: "ТИ116",
          description: `ТИ116 – имеет подключения патрубков: ДУ200, ДУ250.
            Применение: ТЭЦ. (Обогревается совокупность микрорайонов)`,
        },
        chunks: ["ti", "all"],
      }
];
const foodtis = [ 
      /*ПИЩЕВЫЕ */
      /*-1-------П025-----------*/
      {
        title: "Теплообменник П025 пищевой пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/p-025.html",
        templateParameters: {
          du: [25, 32, 40],
          tialias: "p025.png",
          drawalias: "draw116.jpg",
          heading: "П025",
          headingAlias: "П 025",
          description: `Теплообменник П025 пищевого назначения. Отличием от типового исполнения (ТИ 025) на данный теплообменник устанавливаются пищевые штуцера и,
          по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
          link3d: "https://disk.yandex.ru/d/3lo5g4MpzvYFcA",
        },
        chunks: ["ti", "all"],
      } /*-2-------П077-----------*/,
      {
        title: "Теплообменник П077 пищевой пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/p-077.html",
        templateParameters: {
          du: [25, 32, 40],
          tialias: "p077.png",
          drawalias: "draw116.jpg",
          heading: "П077",
          headingAlias: "П 077",
          description: `Теплообменник П077 пищевого назначения. Отличием от типового исполнения (ТИ 077) на данный теплообменник устанавливаются пищевые штуцера и,
          по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
          link3d: "https://disk.yandex.ru/d/3lo5g4MpzvYFcA",
        },
        chunks: ["ti", "all"],
      } /*-3-------П13-----------*/,
      {
        title: "Теплообменник П13 пищевой пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/p-13.html",
        templateParameters: {
          du: [25, 32, 40],
          tialias: "p13.png",
          drawalias: "draw116.jpg",
          heading: "П13",
          headingAlias: "П 13",
          description: `Теплообменник П13 пищевого назначения. Отличием от типового исполнения (ТИ 13) на данный теплообменник устанавливаются пищевые штуцера и,
          по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
          link3d: "https://disk.yandex.ru/d/3lo5g4MpzvYFcA",
        },
        chunks: ["ti", "all"],
      } /*-3-------П18-----------*/,
      {
        title: "Теплообменник П18 пищевой пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/p-18.html",
        templateParameters: {
          du: [25, 32, 40],
          tialias: "p18.png",
          drawalias: "draw116.jpg",
          heading: "П18",
          headingAlias: "П 18",
          description: `Теплообменник П18 пищевого назначения. Отличием от типового исполнения (ТИ 18) на данный теплообменник устанавливаются пищевые штуцера и,
          по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
        },
        chunks: ["ti", "all"],
      } /*-4-------П16,5-----------*/,
      {
        title: "Теплообменник П16,5 пищевой пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/p-16-5.html",
        templateParameters: {
          du: [25, 32, 40],
          tialias: "p18.png", ///ЖДЕМ ФОТО
          drawalias: "draw116.jpg",
          heading: "П16,5",
          headingAlias: "П 16,5",
          description: `Теплообменник П16,5 пищевого назначения. Отличием от типового исполнения (ТИ 16,5) на данный теплообменник устанавливаются пищевые штуцера и,
          по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
          link3d: "https://disk.yandex.ru/d/3lo5g4MpzvYFcA",
        },
        chunks: ["ti", "all"],
      } /*-5-------П28-----------*/,
      {
        title: "Теплообменник П28 пищевой пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/p-28.html",
        templateParameters: {
          du: [25, 32, 40],
          tialias: "p28.png",
          drawalias: "draw116.jpg",
          heading: "П28",
          headingAlias: "П 28",
          description: `Теплообменник П28 пищевого назначения. Отличием от типового исполнения (ТИ 28) на данный теплообменник устанавливаются пищевые штуцера и,
          по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
          link3d: "https://disk.yandex.ru/d/3lo5g4MpzvYFcA",
        },
        chunks: ["ti", "all"],
      } /*-6-------П45-----------*/,
      {
        title: "Теплообменник П45 пищевой пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/p-45.html",
        templateParameters: {
          du: [25, 32, 40],
          tialias: "p45.png",
          drawalias: "draw116.jpg",
          heading: "П45",
          headingAlias: "П 45",
          description: `Теплообменник П45 пищевого назначения. Отличием от типового исполнения (ТИ 45) на данный теплообменник устанавливаются пищевые штуцера и,
          по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
          link3d: "https://disk.yandex.ru/d/3lo5g4MpzvYFcA",
        },
        chunks: ["ti", "all"],
      } /*-7-------П52-----------*/,
      {
        title: "Теплообменник П52 пищевой пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/p-52.html",
        templateParameters: {
          du: [25, 32, 40],
          tialias: "p52.png",
          heading: "П52",
          headingAlias: "П 52",
          drawalias: "draw116.jpg",
          description: `Теплообменник П52 пищевого назначения. Отличием от типового исполнения (ТИ 52) на данный теплообменник устанавливаются пищевые штуцера и,
          по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
          link3d: "https://disk.yandex.ru/d/3lo5g4MpzvYFcA",
        },
        chunks: ["ti", "all"],
      } /*-8-------П65-----------*/,
      {
        title: "Теплообменник П65 пищевой пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/p-65.html",
        templateParameters: {
          du: [25, 32, 40],
          tialias: "p65.png",
          drawalias: "draw116.jpg",
          heading: "П65",
          headingAlias: "П 65",
          description: `Теплообменник П65 пищевого назначения. Отличием от типового исполнения (ТИ 65) на данный теплообменник устанавливаются пищевые штуцера и,
          по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
          link3d: "https://disk.yandex.ru/d/3lo5g4MpzvYFcA",
        },
        chunks: ["ti", "all"],
      },
      {
        title: "Теплообменник П82 пищевой пластинчатый разборный",
        template: "./src/ti-xx-xx.html", // шаблон
        filename: "catalog/p-82.html",
        templateParameters: {
          du: [25, 32, 40],
          tialias: "p65.png",
          drawalias: "draw116.jpg",
          heading: "П82",
          headingAlias: "П 82",
          description: `Теплообменник П82 пищевого назначения. Отличием от типового исполнения (ТИ 82) на данный теплообменник устанавливаются пищевые штуцера и,
          по желанию заказчика, теплообменный аппарат облицовывается нержавеющей сталью.`,
          link3d: "https://disk.yandex.ru/d/3lo5g4MpzvYFcA",
        },
        chunks: ["ti", "all"],
      },
];

module.exports = {
  tis,
  foodtis,
}