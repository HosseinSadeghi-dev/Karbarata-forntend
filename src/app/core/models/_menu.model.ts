import {UserRole} from './_user.model';

export interface MenuContext {
  icon?: string;
  link?: string;
  title?: string;
  active?: boolean;
  permission?: UserRole[];
  items?: SubMenuContext[];
}
interface SubMenuContext {
  title?: string;
  link?: string;
  active?: boolean;
  permission?: UserRole[];
}




export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    displayName: 'DevFestFL',
    iconName: 'recent_actors',
    children: [
      {
        displayName: 'Speakers',
        iconName: 'group',
        children: [
          {
            displayName: 'Michael Prentice',
            iconName: 'person',
            route: 'michael-prentice',
            children: [
              {
                displayName: 'Create Enterprise UIs',
                iconName: 'star_rate',
                route: 'material-design'
              }
            ]
          },
          {
            displayName: 'Stephen Fluin',
            iconName: 'person',
            route: 'stephen-fluin',
            children: [
              {
                displayName: 'What\'s up with the Web?',
                iconName: 'star_rate',
                route: 'what-up-web'
              }
            ]
          },
          {
            displayName: 'Mike Brocchi',
            iconName: 'person',
            route: 'mike-brocchi',
            children: [
              {
                displayName: 'My ally, the CLI',
                iconName: 'star_rate',
                route: 'my-ally-cli'
              },
              {
                displayName: 'Become an Angular Tailor',
                iconName: 'star_rate',
                route: 'become-angular-tailer'
              }
            ]
          }
        ]
      },
      {
        displayName: 'Sessions',
        iconName: 'speaker_notes',
        children: [
          {
            displayName: 'Create Enterprise UIs',
            iconName: 'star_rate',
            route: 'material-design'
          },
          {
            displayName: 'What\'s up with the Web?',
            iconName: 'star_rate',
            route: 'what-up-web'
          },
          {
            displayName: 'My ally, the CLI',
            iconName: 'star_rate',
            route: 'my-ally-cli'
          },
          {
            displayName: 'Become an Angular Tailor',
            iconName: 'star_rate',
            route: 'become-angular-tailer'
          }
        ]
      },
      {
        displayName: 'Feedback',
        iconName: 'feedback',
        route: 'material-design'
      }
    ]
  }
];




export const DashboardMenuList: MenuContext[] = [
  {
    title: 'سوالات متداول',
    items: [
      {
        title: 'دسته بندی',
        link: '/admin/faq/category'
      },
      {
        title: 'سوال جدید',
        link: '/admin/faq/create'
      },
      {
        title: 'لیست سوالات',
        link: '/admin/faq'
      }
    ]
  },
  {
    title: 'نیرو اجرایی ساختمان',
    link: '/admin/workforce',
    items: [
      {
        title: 'دسته بندی متخصص',
        link: '/admin/workforce/master/category',
      },
      {
        title: 'مهارت ها',
        link: '/admin/workforce/master/skill'
      }
    ]
  },
  {
    title: 'طراحی ساخت و ساز',
    link: '/admin/construct',
    items: [
      {
        title: 'مهارت ها',
        link: '/admin/construct'
      }
    ]
  },
  {
    title: 'گالری',
    items: [
      {
        title: 'آلبوم',
        link: '/admin/gallery/album'
      },
      {
        title: 'تصاویر',
        link: '/admin/gallery/photo'
      }
    ]
  },
  {
    title: 'مدیریت کاربران',
    items: [
      {
        title: 'کاربران',
        link: '/admin/user'
      },
      {
        title: 'نیرو ساده',
        link: '/admin/user/workforce/simple'
      },
      {
        title: 'نیرو متخصص',
        link: '/admin/user/workforce/master'
      },
      {
        title: 'نیرو اداری',
        link: '/admin/user/adminstrative'
      }
    ]
  },
  {
    title: 'مدیریت درخواست ها',
    items: [
      {
        title: 'درخواست ها',
        link: '/admin/request'
      },
      {
        title: 'نیرو ساده',
        link: '/admin/request/simple'
      },
      {
        title: 'نیرو متخصص',
        link: '/admin/request/master'
      },
      {
        title: 'طراحی ساخت و ساز',
        link: '/admin/request/construct'
      },
    ]
  },
  {
    title: 'بلاگ',
    items: [
      {
        title: 'دسته بندی',
        link: '/admin/article/category'
      },
      {
        title: 'مقاله جدید',
        link: '/admin/article/create'
      },
      {
        title: 'مقالات',
        link: '/admin/article'
      },
      {
        title: 'نظرات',
        link: '/admin/article/comment'
      }
    ]
  },
  {
    title: 'محصولات',
    items: [
      {
        title: 'دسته بندی',
        link: '/admin/product/category'
      },
      {
        title: 'برند',
        link: '/admin/product/brand'
      },
      {
        title: 'محصول جدید',
        link: '/admin/product/create'
      },
      {
        title: 'محصولات',
        link: '/admin/product'
      }
    ]
  }
];


export const MenuList: MenuContext[] = [
  {
    title: 'صفحه اصلی',
    link: '/'
  },
  {
    title: 'آموزش',
    link: '/coming-soon'
  },
  {
    title: 'مقالات',
    link: '/blog'
  },
  {
    title: 'اخبار',
    link: '/news'
  },
  {
    title: 'فروشگاه',
    link: '/product'
  },
  {
    title: 'سوالات متداول',
    link: '/faq'
  },
  {
    title: 'ارتباط با ما',
    link: '/contact-us'
  }
];

export enum AdviceCategoryContext{
  CONSTRUCT = 'construct',
  WORKFORCE = 'workforce ',
  PRICEADVICE = 'priceadvice ',
  MATERIALSHOP = 'materialshop ',
  TOOLSSHOP = 'toolsshop ',
  HEAVYMACHINERY = 'heavymachinery ',
  SPECIALSERVICES = 'specialservices ',
  MUNICIPALSERVICES = 'municipalservices '
}



