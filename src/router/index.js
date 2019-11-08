import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  /*  {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('@/pages/dashboard/index'),
          name: 'Dashboard',
          meta: { title: '仪表板', icon: 'dashboard', affix: true }
        }
      ]
    },*/
  {
    path: '/',
    component: Layout,
    redirect: '/device/list',
  },
  {
    path: '/agent',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/pages/agent/list'),
        name: 'ListAgent',
        meta: { title: 'Agent', icon: 'node', noCache: true }
      }
    ]
  },
  {
    path: '/app',
    component: Layout,
    children: [
      {
        path: 'add',
        component: () => import('@/pages/app/add'),
        name: 'AddApp',
        meta: { title: '添加App', noCache: true },
        hidden: true
      },
      {
        path: 'update',
        component: () => import('@/pages/app/update'),
        name: 'UpdateApp',
        meta: { title: '更新app', noCache: true },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/pages/app/list'),
        name: 'ListApp',
        meta: { title: 'App', icon: 'app', noCache: true }
      }
    ]
  },
  {
    path: '/device',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/pages/device/list'),
        name: 'ListDevice',
        meta: { title: '设备', icon: 'device', noCache: true }
      }
    ]
  },
  {
    path: '/driver',
    component: Layout,
    children: [
      {
        path: 'add',
        component: () => import('@/pages/driver/add'),
        name: 'AddDriver',
        meta: { title: '添加Driver', noCache: true },
        hidden: true
      },
      {
        path: 'update',
        component: () => import('@/pages/driver/update'),
        name: 'UpdateDriver',
        meta: { title: '更新Driver', noCache: true },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/pages/driver/list'),
        name: 'ListDriver',
        meta: { title: 'Driver', icon: 'chrome', noCache: true }
      }
    ]
  },
  {
    path: '/project',
    component: Layout,
    children: [
      {
        path: 'add',
        component: () => import('@/pages/project/add'),
        name: 'AddProject',
        meta: { title: '添加项目', noCache: true },
        hidden: true
      },
      {
        path: 'update',
        component: () => import('@/pages/project/update'),
        name: 'UpdateProject',
        meta: { title: '更新项目', noCache: true },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/pages/project/list'),
        name: 'ListProject',
        meta: { title: '项目', icon: 'project', noCache: true }
      }
    ]
  },
  {
    path: '/globalVar',
    component: Layout,
    children: [
      {
        path: 'add',
        component: () => import('@/pages/globalvar/add'),
        name: 'AddGlobalVar',
        meta: { title: '添加全局变量', noCache: true },
        hidden: true
      },
      {
        path: 'update',
        component: () => import('@/pages/globalvar/update'),
        name: 'UpdateGlobalVar',
        meta: { title: '更新全局变量', noCache: true },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/pages/globalvar/list'),
        name: 'ListGlobalVar',
        meta: { title: '全局变量', icon: 'globalvar', noCache: true }
      }
    ]
  },
  {
    path: '/page',
    component: Layout,
    children: [
      {
        path: 'add',
        component: () => import('@/pages/page/add'),
        name: 'AddPage',
        meta: { title: '添加Page', noCache: true },
        hidden: true
      },
      {
        path: 'update',
        component: () => import('@/pages/page/update'),
        name: 'UpdatePage',
        meta: { title: '更新Page', noCache: true },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/pages/page/list'),
        name: 'ListPage',
        meta: { title: 'Page', icon: 'page', noCache: true }
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    name: 'Category',
    children: [
      {
        path: 'addPageCategory',
        component: () => import('@/pages/category/addPageCategory'),
        name: 'AddPageCategory',
        meta: { title: '添加Page分类', noCache: true },
        hidden: true
      },
      {
        path: 'addActionCategory',
        component: () => import('@/pages/category/addActionCategory'),
        name: 'AddActionCategory',
        meta: {title: '添加Action分类', noCache: true},
        hidden: true
      }
    ]
  },
  {
    path: '/action/encapsulation',
    component: Layout,
    children: [
      {
        path: 'add',
        component: () => import('@/pages/action/encapsulation/add'),
        name: 'EncapsulationActionAdd',
        meta: { title: '添加Action', noCache: true },
        hidden: true
      },
      {
        path: 'update/:actionId',
        component: () => import('@/pages/action/encapsulation/update'),
        name: 'EncapsulationActionUpdate',
        meta: { title: '更新Action', noCache: true },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/pages/action/encapsulation/list'),
        name: 'EncapsulationActionList',
        meta: { title: 'Action', icon: 'module', noCache: true }
      }
    ]
  },
  {
    path: '/action/testcase',
    component: Layout,
    children: [
      {
        path: 'add',
        component: () => import('@/pages/action/testcase/add'),
        name: 'TestcaseActionAdd',
        meta: { title: '添加测试用例', noCache: true },
        hidden: true
      },
      {
        path: 'update/:actionId',
        component: () => import('@/pages/action/testcase/update'),
        name: 'TestcaseActionUpdate',
        meta: { title: '更新测试用例', noCache: true },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/pages/action/testcase/list'),
        name: 'TestcaseActionList',
        meta: { title: '测试用例', icon: 'testcase', noCache: true }
      }
    ]
  },
  {
    path: '/testSuite',
    component: Layout,
    name: 'TestSuite',
    children: [
      {
        path: 'add',
        component: () => import('@/pages/testsuite/add'),
        name: 'AddTestSuite',
        meta: { title: '添加测试集', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/testPlan',
    component: Layout,
    children: [
      {
        path: 'add',
        component: () => import('@/pages/testplan/add'),
        name: 'TestPlanAdd',
        meta: { title: '添加测试计划', noCache: true },
        hidden: true
      },
      {
        path: 'update/:testPlanId',
        component: () => import('@/pages/testplan/update'),
        name: 'TestPlanUpdate',
        meta: { title: '更新测试计划', noCache: true },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/pages/testplan/list'),
        name: 'TestPlanList',
        meta: { title: '测试集合', icon: 'testplan', noCache: true }
      }
    ]
  },
  {
    path: '/testTask',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/pages/testtask/list'),
        name: 'ListTestTask',
        meta: { title: '测试任务', icon: 'testtask', noCache: true }
      },
      {
        path: 'report/:testTaskId',
        component: () => import('@/pages/testtask/report/index'),
        name: 'ReportTestTask',
        meta: { title: '测试报告', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/testReport',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/pages/testreport/list'),
        name: 'ListTestTask',
        meta: {title: '测试报告', icon: 'chart', noCache: true}
      },
      {
        path: 'report/:testTaskId',
        component: () => import('@/pages/testreport/report/index'),
        name: 'ReportTestTask',
        meta: {title: '测试报告详情', noCache: true},
        hidden: true
      }
    ]
  },
  {
    path: "external-link",
    component: Layout,
    children: [
      {
        "path": "http://192.168.0.187/#/manage/sceneManage",
        "meta": {"title": "接口测试", "icon": "link"}
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
