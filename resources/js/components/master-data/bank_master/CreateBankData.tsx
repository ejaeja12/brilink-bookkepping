import { useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import InputField from '@/components/InputField';
import { toastError, toastSuccess } from '@/components/toastNotif';
import { Button } from '@/components/ui/button';
import { FieldSet, FieldGroup, Field } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import masterBanks from '@/routes/master-banks';

type Props = {
    editId?: string;
    onSuccessCallBack?: () => void;
};

type BankData = {
    id: string;
    name: string;
    status: string;
};

export default function CreateBankData({
    editId = '',
    onSuccessCallBack = () => {},
}: Props) {
    // const [editId, setEditId] = useState('');
    const { bankData } = usePage<{ bankData: BankData[] }>().props;
    function getDataById() {
        // mencari data berdasarkan props editId

        if (editId !== '') {
            const theBank = bankData.find((item: any) => item.id === editId);

            return theBank;
        }
    }

    console.log('bankData', bankData);
    console.log('editId', getDataById());

    const { post, setData, data, put } = useForm({
        name: getDataById()?.name ?? '',
        status: getDataById()?.status ?? 'active',
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
                    put(masterBanks.update.url(editId), {
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
                    post(masterBanks.store.url(), {
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
                    <Field>{data.status}</Field>
                    <InputField
                        label="Name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <Field>
                        <Label>Status</Label>
                        <Switch
                            onCheckedChange={() =>
                                setData(
                                    'status',
                                    data.status === 'active'
                                        ? 'nonactive'
                                        : 'active',
                                )
                            }
                            checked={data.status === 'active'}
                        ></Switch>
                    </Field>
                    <Field>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </Field>
                </FieldGroup>
            </FieldSet>
        </>
    );
}
