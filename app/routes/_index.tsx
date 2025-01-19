import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Aweist LMNT Project" },
    { name: "description", content: "Aweist LMNT Project" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <svg width="100%" height="100%" viewBox="0 0 53.18 53">
            <g fill="black">
              <path d="M29.898 24.068V13.821l4.418 6.683h.09l4.461-6.75v10.317h3.465v-15.8h-3.759l-4.167 6.68-4.168-6.681h-3.76v15.799h3.42zM29.193 32.133h4.825v12.594h3.488V32.133h4.824v-3.205H29.193zM22.239 20.91h-7.906V8.27h-3.487v15.799h11.393z"></path>
              <path d="M0 0v53h53.18V0H0zm49.693 49.521H3.416V3.476h46.277v46.045z"></path>
              <path d="M14.288 34.684l7.68 10.043h2.967V28.928h-3.443v9.73l-7.43-9.73h-3.216v15.799h3.442z"></path>
            </g>
          </svg>
        </header>
      </div>
    </div>
  );
}
