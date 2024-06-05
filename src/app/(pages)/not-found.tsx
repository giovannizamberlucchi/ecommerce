import { Button } from '../_components/Button';
import { Gutter } from '../_components/Gutter';
import { VerticalPadding } from '../_components/VerticalPadding';

const NotFound = () => (
  <Gutter>
    <VerticalPadding top="none" bottom="large">
      <h1 style={{ marginBottom: 0 }}>404</h1>
      <p>Cette page est introuvable.</p>
      <Button href="/" label="Aller à la page d'accueil" appearance="primary" />
    </VerticalPadding>
  </Gutter>
);

export default NotFound;
