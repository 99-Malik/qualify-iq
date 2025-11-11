import AppLayout from '../../components/Layout/AppLayout';
import MailBoxHome from '../../components/MailBox/Home';

export default function MailBoxPage() {
    return (
        <AppLayout activeKey="mailbox">
            <MailBoxHome />
        </AppLayout>
    );
}