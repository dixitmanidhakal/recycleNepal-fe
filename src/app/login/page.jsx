import WrapperDiv from '@/components/layout/WrapperDiv';
import LoginForm from '@/components/auth/loginForm';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

export default async function page() {
  const session = await getServerSession(options);

  if (session) redirect('/home');

  return (
    <div className='flex items-center justify-center text-center'>
      <WrapperDiv>
        <LoginForm />
      </WrapperDiv>
    </div>
  );
}
