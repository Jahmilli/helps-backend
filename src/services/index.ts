import studentRoutes from './student/routes';
import sessionRoutes from './sessions/routes';
import workshopRoutes from './workshops/routes/routes';

export default [...studentRoutes, ...workshopRoutes, ...sessionRoutes];

