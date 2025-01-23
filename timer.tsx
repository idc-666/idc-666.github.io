import { addPropertyControls, ControlType } from "framer"
import { useEffect, useState } from "react"

interface Props {
    fontSize?: number
    textColor?: string
    fontFamily?: string
    debug?: boolean
}

const Timer: React.ComponentType<Props> = ({
    fontSize = 48,
    textColor = "#ffffff",
    fontFamily = "Bebas Neue",
    debug = false,
}) => {
    const [time, setTime] = useState("")
    const [overtimeHours, setOvertimeHours] = useState<number | null>(null)
    const [overtimeMinutes, setOvertimeMinutes] = useState<number | null>(null)
    const [mockDate, setMockDate] = useState<Date | null>(null)

    useEffect(() => {
        const updateTime = () => {
            const now = mockDate || new Date()
            const hours = now.getHours()
            const minutes = now.getMinutes()
            const seconds = now.getSeconds()

            // 格式化时间
            const timeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`

            // 判断是否在加班时间
            const isOvertime = hours >= 18 || (hours >= 0 && hours < 8)
            if (isOvertime) {
                // 计算加班时长
                const overtimeStart = new Date(now)
                overtimeStart.setHours(18, 0, 0, 0)

                if (hours < 8) {
                    // 跨天情况
                    overtimeStart.setDate(overtimeStart.getDate() - 1)
                }

                const diffMs = now.getTime() - overtimeStart.getTime()
                // 计算小时，保留一位小数
                const diffHours = Math.floor((diffMs / (1000 * 60 * 30)) * 0.5 * 10) / 10
                setOvertimeHours(diffHours)
                setOvertimeMinutes(null) // 不再需要分钟显示
            } else {
                setOvertimeHours(null)
                setOvertimeMinutes(null)
            }

            setTime(timeString)
        }

        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [mockDate])

    const handleDebugClick = () => {
        const debugDate = new Date()
        debugDate.setHours(20, 30, 0, 0)
        setMockDate(debugDate)
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
            }}
        >
            <div
                style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: overtimeHours !== null ? fontSize : 36,
                    color: textColor,
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    background: "transparent",
                }}
            >
                {time}
                {overtimeHours !== null && (
                    <>
                        <div
                            style={{
                                width: "2px",
                                height: "0.8em",
                                background: textColor,
                                margin: "-8px",
                                opacity: 0.8,
                            }}
                        />
                        <span
                            style={{
                                fontSize: fontSize,
                                marginLeft: "-5px",
                            }}
                        >
                            {overtimeHours % 1 === 0 ? 
                                Math.floor(overtimeHours) : 
                                overtimeHours.toFixed(1)}
                            <span
                                style={{
                                    marginLeft: "5px",
                                    fontSize: "0.5em",
                                    verticalAlign: "top",
                                    opacity: 0.8,
                                }}
                            >
                                H
                            </span>
                        </span>
                    </>
                )}
            </div>
            {debug && (
                <button
                    onClick={handleDebugClick}
                    style={{
                        padding: "8px 16px",
                        background: "#4A4A4A",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "14px",
                    }}
                >
                    模拟 20:30
                </button>
            )}
        </div>
    )
}

addPropertyControls(Timer, {
    fontFamily: {
        type: ControlType.String,
        title: "Font Family",
        defaultValue: "Bebas Neue",
    },
    fontSize: {
        type: ControlType.Number,
        title: "Font Size",
        defaultValue: 48,
        min: 12,
        max: 200,
        step: 1,
    },
    textColor: {
        type: ControlType.Color,
        title: "Text Color",
        defaultValue: "#808080",
    },
    debug: {
        type: ControlType.Boolean,
        title: "Debug Mode",
        defaultValue: false,
    },
})

export default Timer
