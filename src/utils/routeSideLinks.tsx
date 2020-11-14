export interface IitemsLinks {
    icon: string
    text: string
    path: string
}

type simple = IitemsLinks[];

interface IrouteLinks {
    common: simple
    admin: simple
}

export const routeSideLinks:IrouteLinks = {
    common: [
        {
            icon: 'home',
            text: 'Home',
            path: '/'
        },
        {
            icon: 'sign-in',
            text: 'Log-in',
            path: '/login'
        }

    ],
    admin: [
        {
            icon: 'sign-out',
            text: 'Log-out',
            path: '/logout'
        },
        {
            icon: 'home',
            text: 'Admin',
            path: '/admin'
        },
        {
            icon: 'clipboard',
            text: 'My posts',
            path: '/admin/posts'
        },
        {
            icon: 'plus',
            text: 'Add post',
            path: '/admin/post/create'
        }
    ]
}