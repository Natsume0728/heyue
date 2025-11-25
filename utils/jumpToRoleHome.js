import store from '@/store/index.js'


const jumpToRoleHome = (roleTypeCode) => {
    let switchTabbarList = [];

    if (roleTypeCode === "dubber") {
        switchTabbarList = [
            {
                name: "mission-hall",
                path: "/pages/client-side/common/mission-hall",
                inActiveIcon: "/static/rwdd.png",
                activeIcon: "/static/rwdd_on.png",
                text: "任务大厅",
            },
            {
                name: "mine",
                path: "/pages/client-side/common/mine",
                inActiveIcon: "/static/wd.png",
                activeIcon: "/static/wd_on.png",
                text: "我的",
            },
        ];
    } else if (roleTypeCode === "channel") {
        switchTabbarList = [
            {
                name: "recommend",
                path: "/pages/client-side/common/voice-recommend",
                inActiveIcon: "/static/pyytj.png",
                activeIcon: "/static/pyytj_on.png",
                text: "配音员推荐",
            },
            {
                name: "mission-hall",
                path: "/pages/client-side/common/mission-hall",
                inActiveIcon: "/static/rwdd.png",
                activeIcon: "/static/rwdd_on.png",
                text: "任务大厅",
            },
            {
                name: "publish-task",
                path: "/pages/client-side/common/publish-task",
                inActiveIcon: "/static/fbrw.png",
                activeIcon: "/static/fbrw_on.png",
                text: "发布任务",
            },
            {
                name: "mine",
                path: "/pages/client-side/common/mine",
                inActiveIcon: "/static/wd.png",
                activeIcon: "/static/wd_on.png",
                text: "我的",
            },
        ];
    } else if (roleTypeCode === "employer") {
        switchTabbarList = [
            {
                name: "recommend",
                path: "/pages/client-side/common/voice-recommend",
                inActiveIcon: "/static/pyytj.png",
                activeIcon: "/static/pyytj_on.png",
                text: "配音员推荐",
            },
            {
                name: "publish-task",
                path: "/pages/client-side/common/publish-task",
                inActiveIcon: "/static/fbrw.png",
                activeIcon: "/static/fbrw_on.png",
                text: "发布任务",
            },
            {
                name: "mine",
                path: "/pages/client-side/common/mine",
                inActiveIcon: "/static/wd.png",
                activeIcon: "/static/wd_on.png",
                text: "我的",
            },
        ];
    } else if (roleTypeCode === "backstage" || roleTypeCode === "admin" ) {
        switchTabbarList = [
            {
                name: "user-nanage",
                path: "/pages/manage-backend/user-manage/index",
                inActiveIcon: "/static/yhgl.png",
                activeIcon: "/static/yhgl_on.png",
                text: "用户管理",
            },
            {
                name: "task-nanage",
                path: "/pages/manage-backend/task-manage/index",
                icon: "home",
                inActiveIcon: "/static/rwgl.png",
                activeIcon: "/static/rwgl_on.png",
                text: "任务管理",
            },
            {
                name: "config-manage",
                path: "/pages/manage-backend/config-manage/index",
                icon: "home",
                inActiveIcon: "/static/pzgl.png",
                activeIcon: "/static/pzgl_on.png",
                text: "配置管理",
            },
        ];
    }

    store.commit('set_switchTabbarList', switchTabbarList)
    store.commit('set_role', roleTypeCode)
    store.commit('set_switchTabbarValue', switchTabbarList[0].name)
    uni.reLaunch({ url: switchTabbarList[0].path });
}


export default jumpToRoleHome;