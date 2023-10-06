import { format, isToday, isYesterday, isThisWeek } from 'date-fns';

export function formatTime(dateTime: string) {
    const pastTime = new Date(dateTime);

    if (isToday(pastTime)) {
        return format(pastTime, 'HH:mm');
    } else if (isYesterday(pastTime)) {
        return 'Yesterday';
    } else if (isThisWeek(pastTime)) {
        return format(pastTime, 'eeee'); // Ngày trong tuần, ví dụ: "Monday"
    } else {
        return format(pastTime, 'MM/dd/yyyy'); // Định dạng ngày tháng, ví dụ: "01/01/2024"
    }
}

export function formatTimeMessage(dateTime: string) {
    const pastTime = new Date(dateTime);

    if (isToday(pastTime)) {
        return format(pastTime, 'HH:mm');
    } else if (isThisWeek(pastTime)) {
        const mapToVietnameseDays = {
            'Monday': 'T2',
            'Tuesday': 'T3',
            'Wednesday': 'T4',
            'Thursday': 'T5',
            'Friday': 'T6',
            'Saturday': 'T7',
            'Sunday': 'CN',
        } as any;
        return `${mapToVietnameseDays[format(pastTime, 'eeee')]} ${format(pastTime, 'HH:mm')}`;
    } else {
        return `${format(pastTime, 'MM/dd/yyyy')} ${format(pastTime, 'hh:mm')}`; // Định dạng ngày tháng, ví dụ: "01/01/2024"
    }
}


