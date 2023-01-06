import log4js from 'log4js'
import path from 'path'
import {
    app
} from 'electron'
 
// 日志文件的输出路径，这里我们选择userData path下的logs
// 在我的电脑上是C:\Users\xxx\AppData\Roaming\myApp\logs
const LOG_PATH = path.join(app.getPath('userData'), 'logs')
 
log4js.configure({
    appenders: {
        // 设置控制台输出 （默认日志级别是关闭的（即不会输出日志））
        out: { 
            type: 'console' // 配置了这一项，除了会输出到日志文件，也会输出到控制台
        },
        // 设置每天：以日期为单位,数据文件类型，dataFiel 注意设置pattern，alwaysIncludePattern属性
        alldateFileLog: { 
            type: 'dateFile', 
            filename: path.join(LOG_PATH, 'log'), 
            pattern: '.yyyy-MM-dd.log', // 每天生成按这个格式拼接到filename后边
            alwaysIncludePattern: true // 始终包含pattern
        },
        httpLog: { 
            type: "dateFile", 
            filename: path.join(LOG_PATH, 'http'), 
            pattern: ".yyyy-MM-dd.log", 
            keepFileExt: true, // 文件名是否需要加".log"后缀
            alwaysIncludePattern: true
        },
        renderProccessLog: {
            type: "dateFile", 
            filename: path.join(LOG_PATH, 'renderer'), 
            pattern: ".yyyy-MM-dd.log", 
            keepFileExt: true,
            alwaysIncludePattern: true
        },
        mainProccessLog: {
            type: 'file', 
            filename: path.join(LOG_PATH, 'main.log'), 
            keepFileExt: true, 
            maxLogSize: 1024 * 1024 * 100, // 文件最大容纳值
            backups: 3
        },
        crashLog: {
            type: 'file', 
            filename: path.join(LOG_PATH, 'crash.log') 
        },
        // 错误日志 type:过滤类型logLevelFilter,将过滤error日志写进指定文件
        errorLog: { 
            type: 'file', 
            filename: path.join(LOG_PATH, 'error.log')
        },
        error: { 
            type: "logLevelFilter", 
            level: "error",
            appender: 'errorLog' 
        }
    },
    // 不同等级的日志追加到不同的输出位置：appenders: ['out', 'allLog']  categories 作为getLogger方法的键名对应
    categories: {
        date: {
            appenders: ['out', 'alldateFileLog'], 
            level: "debug" 
        },
        http: { 
            appenders: ['out', 'httpLog'], 
            level: "debug" 
        },
        main: {
            appenders: ['out', 'mainProccessLog'], 
            level: "debug"
        },
        renderer: {
            appenders: ['renderProccessLog'], 
            level: "debug"
        },
        crash: {
            appenders: ['out', 'crashLog'], 
            level: "debug"
        },
        default: {
            appenders: ['out', 'alldateFileLog'], 
            level: "debug" 
        }
    }
});
 
export default {
    default: log4js.getLogger('date'),
    http: log4js.getLogger('http'),
    main: log4js.getLogger('main'),
    renderer: log4js.getLogger('renderer'),
    crash: log4js.getLogger('crash')
}