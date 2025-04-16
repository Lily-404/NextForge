import userData from "@/data/user-data"
import MinimalistTemplate from "@/components/templates/minimalist-template"
import BusinessTemplate from "@/components/templates/business-template"
import CreativeTemplate from "@/components/templates/creative-template"
import FunTemplate from "@/components/templates/fun-template"

export default function Home() {
  // 根据用户选择的模板类型渲染对应的模板
  const renderTemplate = () => {
    switch (userData.template) {
      case "minimalist":
        return <MinimalistTemplate userData={userData} />
      case "business":
        return <BusinessTemplate userData={userData} />
      case "creative":
        return <CreativeTemplate userData={userData} />
      case "fun":
        return <FunTemplate userData={userData} />
      default:
        return <MinimalistTemplate userData={userData} />
    }
  }

  return renderTemplate()
}
