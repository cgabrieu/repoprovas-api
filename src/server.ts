import app from './app';
import './setup';

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${process.env.PORT}`);
});
