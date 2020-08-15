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
    title: 'کاربران',
    items: [
      {
        title: 'لیست کاربران',
        link: '/admin/user'
      },
      {
        title: 'کاربر جدید',
        link: '/admin/user/create'
      }
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
