//  NOTE: template内的图片路径要用打包后的，所以必须放在public内，并添加/dist前缀
// if v-html want to render image or somthing, href must be same with webpacked path, just like /dist/... 
export const generateRoute4 = (i18n) => [
    {
        name: `${i18n.t('route')}4_1`,
        link: `route4_1`,
        children: [
            {
                name: `${i18n.t('route')}4_1_1`, link: `route4_1_1`, template: `<div>${i18n.t('route')}4_1_1</div>`
            },
            {
                name: `${i18n.t('route')}4_1_2`, link: `route4_1_2`, template: `<div>${i18n.t('route')}4_1_2</div>`
            },
            {
                name: `${i18n.t('route')}4_1_3`, link: `route4_1_3`, template: `<div>${i18n.t('route')}4_1_3</div>`
            },
            {
                name: `${i18n.t('route')}4_1_4`, link: `route4_1_4`, template: `<div>${i18n.t('route')}4_1_4</div>`
            },
            {
              name: `${i18n.t('route')}4_1_5`, link: `route4_1_5`, template: `<div>${i18n.t('route')}4_1_5</div>`
            },
        ],
    },
    {
        name: `${i18n.t('route')}4_2`,
        link: `route4_2`,
        children: [
            {
                name: `${i18n.t('route')}4_2_1`,
                link: `route_2_1`,
                children: [
                    {
                      name: `${i18n.t('route')}4_2_1_1`, link: `route4_2_1_1`, template: `<div>${i18n.t('route')}4_2_1_1</div>`
                    },
                    {
                      name: `${i18n.t('route')}4_2_1_2`, link: `route4_2_1_2`, template: `<div>${i18n.t('route')}4_2_1_2</div>`
                    },
                    {
                      name: `${i18n.t('route')}4_2_1_3`, link: `route4_2_1_3`, template: `<div>${i18n.t('route')}4_2_1_3</div>`
                    },
                    {
                      name: `${i18n.t('route')}4_2_1_4`, link: `route4_2_1_4`, template: `<div>${i18n.t('route')}4_2_1_4</div>`
                    },
                ],
            },
            {
              name: `${i18n.t('route')}4_2_2`, link: `route4_2_2`, template: `<div>${i18n.t('route')}4_2_2</div>`
            },
            {
              name: `${i18n.t('route')}4_2_3`, link: `route4_2_3`, template: `<div>${i18n.t('route')}4_2_3</div>`
            },
        ],
    },
    {
        name: `${i18n.t('route')}4_3`,
        link: `route4_3`,
        children: [{
          name: `${i18n.t('route')}4_3_1`, link: `route4_3_1`, template: `<div>${i18n.t('route')}4_3_1</div>`
        }, {
          name: `${i18n.t('route')}4_3_2`, link: `route4_3_2`, template: `<div>${i18n.t('route')}4_3_2</div>`
        },],
    },
    {
        name: `${i18n.t('route')}4_4`,
        link: `route4_4`,
        children: [
            {
              name: `${i18n.t('route')}4_4_1`, link: `route4_4_1`, template: `<div>${i18n.t('route')}4_4_1</div>`
            },
            {
              name: `${i18n.t('route')}4_4_2`, link: `route4_4_2`, template: `<div>${i18n.t('route')}4_4_2</div>`
            },
        ],
    },
];
