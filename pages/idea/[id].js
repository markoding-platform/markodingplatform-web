import Layout from 'components/Layout';
import IdeaAndSolutionLayout from 'components/IdeaAndSolutionLayout';
import DetailIdea from 'components/IdeaAndSolutionContainer/DetailIdea';

export default function Idea() {
  return (
    <Layout>
      <div className="px-3 mt-4">
        <IdeaAndSolutionLayout>
          <DetailIdea />
        </IdeaAndSolutionLayout>
      </div>
    </Layout>
  );
}
