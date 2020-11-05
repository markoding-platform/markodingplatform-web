<<<<<<< HEAD
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <h1>Welcom to Markoding Platform</h1>
    </Layout>
  )
=======
import Layout from '../components/Layout';
import IdeaCard from '../components/IdeaCard';

export default function Home() {
	return (
  <Layout>
    <IdeaCard
      imageUrl="https://dailyspin.id/wp-content/uploads/2020/11/Event-11-Mobile-Legends-700x525.jpg"
      title="Workshop Untuk Guru"
      description="Terra, Social enterprise, manufatrues and sells..."
      like={12}
      comment={10}
      link="/account"
    />
  </Layout>
	);
>>>>>>> 50a88c4... add header component
}
