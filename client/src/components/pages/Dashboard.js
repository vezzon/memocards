import useCards from '../../hooks/useCards';
import './Dashboard.css';
import AddCard from '../AddCard';
import AddCardsCsv from '../AddCardsCsv';

const Dashboard = () => {
  const { cards } = useCards();

  return (
    <div className="dashboard__container">
      <h2 className="dashboard__header">Flashcards total: {cards.length} </h2>
      <AddCard />
      <AddCardsCsv />
    </div>
  );
};

export default Dashboard;
