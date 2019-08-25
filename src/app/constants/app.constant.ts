export class AppConstant {
    
    public static SESSIONKEY: string;
    public static STATUS: string = 'UpdatesComplete';
    public static CALENDARDAYS: number = 30;
    public static SOURCE: {country: string, value: string}[] = [{ country: 'Singapore (SIN)', value: 'SIN' }, { country: 'Kuala Lumpur (KUL)', value: 'KUL' }];
    public static DESTINATION: {country: string, value: string}[] = [{ country: 'Singapore (SIN)', value: 'SIN' },
                                                                { country: 'Kuala Lumpur (KUL)', value: 'KUL' },
                                                                { country: 'San Francisco (SFO)', value: 'SFO' }];
}

