import { useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import InputField from '@/components/InputField';
import { toastError, toastSuccess } from '@/components/toastNotif';
import { Button } from '@/components/ui/button';
import { FieldSet, FieldGroup, Field } from '@/components/ui/field';
import masterPembayarans from '@/routes/master-pembayarans';

type Props = {
    editId?: string;
    onSuccessCallBack?: () => void;
};

type PembayaranData = {
    id: string;
    name: string;
};

export default function CreatePembayaranData({
    editId = '',
    onSuccessCallBack = () => {},
}: Props) {
    // const [editId, setEditId] = useState('');
    const { dataPembayaran } = usePage<{ dataPembayaran: PembayaranData[] }>()
        .props;
    function getDataById() {
        // mencari data berdasarkan props editId

        if (editId !== '') {
            const theBank = dataPembayaran.find(
                (item: any) => item.id === editId,
            );

            return theBank;
        }
    }

    console.log('bankData', dataPembayaran);
    console.log('editId', getDataById());

    const { post, setData, data, put } = useForm({
        name: getDataById()?.name ?? '',
    });

    function validate(val: string, onSuccess: () => void) {
        if (val === '') {
            toastError('Name harus diisi');
        } else {
            onSuccess();
        }
    }

    function handleSubmit() {
        // console.log('Submit');
        if (editId !== '') {
            validate(
                data.name,

                () =>
                    put(masterPembayarans.update.url(editId), {
                        onFinish: () => {
                            toastSuccess(JSON.stringify(data));
                            onSuccessCallBack();
                        },
                    }),
            );
        } else {
            validate(
                data.name,

                () =>
                    post(masterPembayarans.store.url(), {
                        onFinish: () => {
                            toastSuccess('Bank berhasil ditambahkan');
                            onSuccessCallBack();
                        },
                    }),
            );
        }
    }

    return (
        <>
            <FieldSet>
                <FieldGroup>
                    <InputField
                        label="Name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />

                    <Field>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </Field>
                </FieldGroup>
            </FieldSet>
        </>
    );
}
