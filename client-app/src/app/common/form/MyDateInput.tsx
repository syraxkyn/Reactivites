import { useField } from 'formik';
import react from 'react';
import { Form, Label } from 'semantic-ui-react';
import DatePicker, {ReactDatePickerProps} from 'react-datepicker';

interface Props {
    placeholder: string;
    name: string;
    label?: string;
}

export default function MyDateInput(props: Partial<ReactDatePickerProps>) {
    const [field, meta, helpers] = useField(props.name!);
    const today = new Date(); // Получаем сегодняшнюю дату
    const currentTime = today.getHours() * 60 + today.getMinutes(); // Переводим текущее время в минуты
    const maxTime = 1439;

    const minutesToTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, mins);
    };

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
                minDate={today} // Устанавливаем минимальную доступную дату
                showTimeSelect // Показываем выбор времени
                minTime={today.getHours() > 0 || today.getMinutes() > 0 ? currentTime : 0} // Устанавливаем минимальное доступное время
                maxTime={minutesToTime(maxTime)}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}