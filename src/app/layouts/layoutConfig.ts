export const defaultNavigationConfig = [{
    title: 'WHAT IS KINTO ONE',
    isOpen: false,
    children: [
        {
            title: 'About KINTO',
            url: '/about'
        },
        {
            title: 'How to apply',
            url: '/apply'
        }
    ]
},
{
    title: 'NEWS & PROMOTION',
    isOpen: false,
    children: [
        {
            title: 'All',
            url: '/news',
        },
        {
            title: 'Promotion',
            url: '/news',
            queryParams: { type: 'Latest Promotion' }
        },
        {
            title: 'Press release',
            url: '/news',
            queryParams: { type: 'New Releases' }
        }
    ]
},
{
    title: 'FAQ',
    isOpen: false,
    children: [
        {
            title: 'All',
            url: '/faq',
        },
    ]
},
{
    title: 'MY ORDER',
    url: 'https://status-uat.toyotafinancial.sg/?module=applicationstatus',
    outLink: true
},
{
    title: 'CONTACT US',
    url: '/contact'
}];

export const defaultFooterConfig = [{
    title: 'WHAT IS KINTO ONE',
    url: '/about',
    isOpen: false,
    children: [
        {
            title: 'About KINTO',
            url: '/about'
        },
        {
            title: 'How to apply',
            url: '/apply'
        }
    ]
},
{
    title: 'NEWS',
    url: '/news',
    isOpen: false,
    children: [
        {
            title: 'All',
            url: '/news',
        },
        {
            title: 'Promotion',
            url: '/news',
            queryParams: { type: 'Latest Promotion' }
        },
        {
            title: 'Press release',
            url: '/news',
            queryParams: { type: 'New Releases' }
        }
    ]
},
{
    title: 'FAQ',
    url: '/faq',
    isOpen: false,
    children: [
        {
            title: 'All',
            url: '/faq',
        },
    ]
}]
