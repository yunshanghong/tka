export const defaultNavigationConfig = [{
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
    title: 'NEWS & PROMOTION',
    url: '/news',
    isOpen: false,
    children: [
        {
            title: 'Promotion',
            url: '/news'
        },
        {
            title: 'Press release',
            url: '/news'
        }
    ]
},
{
    title: 'FAQ',
    url: '/faq',
    isOpen: false,
    children: [
        {
            title: 'Accessories',
            url: '/faq',
            queryParams: { type: 'Accessories' }
        },
        {
            title: 'Insurance & Maintenance',
            url: '/faq',
            queryParams: { type: 'Insurance & Claim Service' }
        },
        {
            title: 'Payment',
            url: '/faq',
            queryParams: { type: 'Payment' }
        },
        {
            title: 'Others',
            url: '/faq',
            queryParams: { type: 'Others' }
        }
    ]
},
{
    title: 'MY ORDER',
    url: '/'
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
            title: 'Promotion',
            url: '/news'
        },
        {
            title: 'Press release',
            url: '/news'
        }
    ]
},
{
    title: 'FAQ',
    url: '/faq',
    isOpen: false,
    children: [
        {
            title: 'Accessories',
            url: '/faq',
            queryParams: { type: 'Accessories' }
        },
        {
            title: 'Insurance & Maintenance',
            url: '/faq',
            queryParams: { type: "Insurance & Claim Service" }
        },
        {
            title: 'Payment',
            url: '/faq',
            queryParams: { type: 'Payment' }
        },
        {
            title: 'Others',
            url: '/faq',
            queryParams: { type: 'Others' }
        }
    ]
}]
