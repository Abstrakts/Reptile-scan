import Login from '../views/Login'
import App from '../components/App'
import Notifications from '../views/Notifications'
import Home from '../views/Home'
import Scanner from '../views/Scanner'
import editProfil from '../views/profil/editProfil'
import AnimalProfil from '../views/animal/profil'
import ToPrintCard from '../components/ToPrintCard'

const router = {
  login: Login,
  app: App,
  home: Home,
  notifications: Notifications,
  scanner: Scanner,
  profil: editProfil,
  animalProfil: AnimalProfil
}

export default router
