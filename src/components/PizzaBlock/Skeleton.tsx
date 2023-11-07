import ContentLoader from "react-content-loader"

export const Skeleton = () => {

  return (
      <ContentLoader 
        className="pizza-block"
        speed={.5}
        width={280}
        height={460}
        viewBox="0 0 280 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <circle cx="134" cy="128" r="120" /> 
        <rect x="0" y="266" rx="10" ry="10" width="280" height="24" /> 
        <rect x="0" y="312" rx="10" ry="10" width="280" height="85" /> 
        <rect x="0" y="420" rx="10" ry="10" width="74" height="40" /> 
        <rect x="160" y="420" rx="10" ry="10" width="120" height="40" /> 
      </ContentLoader>
  )
}
