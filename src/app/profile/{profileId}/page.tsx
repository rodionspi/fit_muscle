import { useRouter } from 'next/router';

const ProfilePage = () => {
  const router = useRouter();
  const { profileId } = router.query;

  return <div>Профиль пользователя с ID: {profileId}</div>;
};

export default ProfilePage;