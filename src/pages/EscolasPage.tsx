import { Header } from "../components/Header"
import { SchoolList } from "../layout/SchoolList"
export default function EscolasPage() {
  return (
    <div>
        <Header />
        <div className="pt-20 p-12 bg-gray-100 min-h-screen">
            <SchoolList/>
        </div>
    </div>
  )
}
