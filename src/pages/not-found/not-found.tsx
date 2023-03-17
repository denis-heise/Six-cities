import { Link } from 'react-router-dom';

function NotFound (): JSX.Element {
  return (
    <div style={{margin: '200px auto 0', width: 'fit-content', fontSize: '33px', textAlign: 'center'}}>
      <h1>404</h1>
      <h2>Not Found</h2>
      <Link to='/' title='Main page' style={{color: 'blue'}}>
        Go main page
      </Link>
    </div>
  );
}

export default NotFound;
