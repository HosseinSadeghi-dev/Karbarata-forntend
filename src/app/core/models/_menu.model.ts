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
  title: string;
  disabled?: boolean;
  icon?: string;
  link?: string;
  allowedRoles?: UserRole[];
  items?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    title: 'سوالات متداول',
    icon: 'help_outline',
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
    ],
    allowedRoles: [
      UserRole.ADMIN,
      UserRole.AUTHOR,
      UserRole.OPERATOR
    ]
  },
  {
    title: 'نیرو اجرایی ساختمان',
    icon: 'engineering',
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
    ],
    allowedRoles: [
      UserRole.ADMIN,
      UserRole.AUTHOR,
    ]
  },
  {
    title: 'طراحی ساخت و ساز',
    icon: 'construction',
    link: '/admin/construct',
    items: [
      {
        title: 'مهارت ها',
        link: '/admin/construct'
      }
    ],
    allowedRoles: [
      UserRole.ADMIN,
      UserRole.AUTHOR,
    ]
  },
  {
    title: 'گالری',
    icon: 'collections',
    items: [
      {
        title: 'آلبوم',
        link: '/admin/gallery/album'
      },
      {
        title: 'تصاویر',
        link: '/admin/gallery/photo'
      }
    ],
    allowedRoles: [
      UserRole.ADMIN,
      UserRole.AUTHOR,
    ]
  },
  {
    title: 'مدیریت کاربران',
    icon: 'people',
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
    ],
    allowedRoles: [
      UserRole.ADMIN,
      UserRole.OPERATOR,
    ]
  },
  {
    title: 'مدیریت درخواست ها',
    icon: 'receipt_long',
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
    ],
    allowedRoles: [
      UserRole.ADMIN,
      UserRole.OPERATOR,
      UserRole.EXPERT,
      UserRole.CONTRACTOR,
      UserRole.ACCOUNTANT
    ]
  },
  {
    title: 'بلاگ',
    icon: 'rss_feed',
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
    ],
    allowedRoles: [
      UserRole.ADMIN,
      UserRole.AUTHOR,
    ]
  },
  // {
  //   title: 'محصولات',
  //   icon: 'local_grocery_store',
  //   items: [
  //     {
  //       title: 'دسته بندی',
  //       link: '/admin/product/category'
  //     },
  //     {
  //       title: 'برند',
  //       link: '/admin/product/brand'
  //     },
  //     {
  //       title: 'محصول جدید',
  //       link: '/admin/product/create'
  //     },
  //     {
  //       title: 'محصولات',
  //       link: '/admin/product'
  //     }
  //   ]
  // },
  {
    title: 'ارتباط با ما',
    icon: 'how_to_reg',
    items: [
      {
        title: 'همکاری با ما',
        link: '/admin/contact/cooperation'
      },
      {
        title: 'تماس با ما',
        link: '/admin/contact/contactUs'
      },
      {
        title: 'شکایات',
        link: '/admin/contact/complain'
      }
    ],
    allowedRoles: [
      UserRole.ADMIN,
      UserRole.OPERATOR,
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
    title: 'درخواست',
    items:[
      {
        title: 'نیرو ساده',
        link: '/request/simple'
      },
      {
        title: 'نیرو متخصص',
        link: '/request/master'
      },
      {
        title: 'طراحی ، ساخت و ساز',
        link: '/request/construct'
      },
    ]
  },

  {
    title: 'خدمات و استعلامات',
    items:[
      {
        title: 'خدمات شهرداری',
        link: '/request/municipality'
      },
      {
        title: 'مشاوره و استعلام قیمت',
        link: '/request/price-advice'
      },
    ]
  },

  {
    title: 'درباره ما',
    link: '/about',
  },

  {
    title: 'همکاری با ما',
    link: '/about/cooperation'
  }
];

export enum AdviceCategoryContext{
  CONSTRUCT = 'construct',
  WORKFORCE = 'workforce ',
  MATERIALSHOP = 'materialshop ',
  TOOLSSHOP = 'toolsshop ',
  HEAVYMACHINERY = 'heavymachinery ',
  SPECIALSERVICES = 'specialservices ',
  MUNICIPALSERVICES = 'municipalservices '
}



