import svgPaths from "./svg-pb2vbaz0eg";
import imgAvatar from "figma:asset/9f8bf26df9105402aa4599dc4682448af3ef9dda.png";

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p9024100} fill="var(--fill-0, #1A66FC)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#1a66fc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon />
      <p className="font-['Lato:Bold',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1a66fc] text-[12px] text-nowrap whitespace-pre">Sede</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p9024100} fill="var(--fill-0, #1A66FC)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#1a66fc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon1 />
      <p className="font-['Lato:Bold',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1a66fc] text-[12px] text-nowrap whitespace-pre">Profesional</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2a7912c0} fill="var(--fill-0, #1A66FC)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[8px] h-[24px] items-center justify-center px-[8px] py-[4px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#1a66fc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon2 />
      <p className="font-['Lato:Bold',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#1a66fc] text-[12px] text-nowrap whitespace-pre">Otros filtros</p>
    </div>
  );
}

function Frame2609204() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

function ContenedorIzquierda() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap" data-name="Contenedor izquierda">
      <div className="flex flex-col font-['Lato:Bold',_sans-serif] justify-center relative shrink-0 text-[#40435b]">
        <p className="leading-[18px] text-nowrap whitespace-pre">Resultados de búsqueda</p>
      </div>
      <div className="flex flex-col font-['Lato:Regular',_sans-serif] justify-center relative shrink-0 text-[#6b6f93]">
        <p className="leading-[18px] text-nowrap whitespace-pre">20 profesionales disponibles</p>
      </div>
    </div>
  );
}

function TextButton() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-[328px]" data-name="Text + Button">
      <ContenedorIzquierda />
    </div>
  );
}

function Filters() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-end relative shrink-0 w-full" data-name="Filters">
      <TextButton />
    </div>
  );
}

function Avatar() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[32px]" data-name="Avatar">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
        <img alt="" className="absolute h-[220.95%] left-[-8.59%] max-w-none top-[-30.49%] w-[147.27%]" src={imgAvatar} />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p3d764a00} fill="var(--fill-0, #40435B)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Default() {
  return (
    <div className="bg-[#fff4f0] box-border content-stretch flex gap-[4px] items-center opacity-0 px-[8px] py-[2px] relative rounded-[8px] shrink-0" data-name="Default">
      <div aria-hidden="true" className="absolute border border-[#ffded3] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon3 />
      <div className="flex flex-col font-['Lato:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#40435b] text-[12px] text-nowrap">
        <p className="leading-[16px] whitespace-pre">Equipo</p>
      </div>
    </div>
  );
}

function Frame2609110() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <div className="flex flex-col font-['Lato:Bold',_sans-serif] justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#40435b] text-[14px] text-nowrap">
        <p className="leading-[18px] overflow-ellipsis overflow-hidden whitespace-pre">Diego Landa</p>
      </div>
      <Default />
    </div>
  );
}

function Info() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="Info">
      <Frame2609110 />
      <div className="flex flex-col font-['Lato:Regular',_sans-serif] h-[16px] justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#6b6f93] text-[14px] text-nowrap w-full">
        <p className="[white-space-collapse:collapse] leading-[18px] overflow-ellipsis overflow-hidden">Consulta clínica médica</p>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Content">
      <Avatar />
      <Info />
    </div>
  );
}

function User() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-center relative shrink-0 w-full" data-name="User">
      <Content />
    </div>
  );
}

function BasicCircleDollarOutline() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Basic/circle-dollar/outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Basic/circle-dollar/outline">
          <path d={svgPaths.p2fab9b80} fill="var(--fill-0, #E22E2E)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame7970() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <BasicCircleDollarOutline />
      <div className="flex flex-col font-['Lato:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#40435b] text-[0px] text-nowrap">
        <p className="leading-[18px] text-[14px] whitespace-pre">
          <span>{`Copago cobertura `}</span>
          <span className="font-['Lato:Bold',_sans-serif] not-italic">$2.000</span>
        </p>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Divider">
      <div className="absolute bottom-full left-0 right-0 top-0" data-name="Line">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 296 1">
            <path d="M0 0.5H296" id="Line" stroke="var(--stroke-0, #E0E1E9)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BasicLocationDotOutline() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Basic/location-dot/outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Basic/location-dot/outline">
          <path d={svgPaths.pf1d8600} fill="var(--fill-0, #40435B)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame2609014() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <BasicLocationDotOutline />
      <div className="flex flex-col font-['Lato:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#40435b] text-[14px] text-nowrap">
        <p className="leading-[18px] whitespace-pre">Sanatorio Osana Salud</p>
      </div>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Title">
      <Frame2609014 />
    </div>
  );
}

function Button4() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#1a66fc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative w-full">
          <p className="font-['Lato:Bold',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1a66fc] text-[14px] text-nowrap whitespace-pre">08:00</p>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="basis-0 bg-[#f1f6ff] grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#1a66fc] border-[2.5px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative w-full">
          <p className="font-['Lato:Bold',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1a66fc] text-[14px] text-nowrap whitespace-pre">09:20</p>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#1a66fc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative w-full">
          <p className="font-['Lato:Bold',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1a66fc] text-[14px] text-nowrap whitespace-pre">10:00</p>
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative w-full">
          <div className="flex flex-col font-['Lato:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a66fc] text-[14px] text-nowrap">
            <p className="leading-[18px] whitespace-pre">Ver más</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Button">
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
    </div>
  );
}

function Frame2609013() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Title />
      <Button8 />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(64,67,91,0.1),0px_1px_2px_0px_rgba(64,67,91,0.06)] shrink-0 w-full" data-name="Card">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] items-start justify-center p-[16px] relative w-full">
          <User />
          <Frame7970 />
          <Divider />
          <Frame2609013 />
        </div>
      </div>
    </div>
  );
}

function Search() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[16px] h-[529px] items-start left-0 overflow-clip p-[16px] top-[267px] w-[360px]" data-name="Search">
      <Frame2609204 />
      <Filters />
      <Card />
    </div>
  );
}

function NavigationArrowArrowLeft() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Navigation/arrow/arrow-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Navigation/arrow/arrow-left">
          <path d={svgPaths.p2506d500} fill="var(--fill-0, #1A66FC)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function MenuLogo() {
  return (
    <div className="basis-0 content-stretch flex gap-[16px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Menu + logo">
      <NavigationArrowArrowLeft />
      <p className="basis-0 font-['Lato:Bold',_sans-serif] grow leading-[22px] min-h-px min-w-px not-italic relative shrink-0 text-[#40435b] text-[18px]">Seleccionar turno</p>
    </div>
  );
}

function Content1() {
  return (
    <div className="basis-0 content-stretch flex gap-[104px] grow h-[32px] items-center min-h-px min-w-px relative shrink-0" data-name="Content">
      <MenuLogo />
    </div>
  );
}

function Mobile() {
  return (
    <div className="absolute bg-white box-border content-stretch flex h-[80px] items-center justify-center left-0 px-[16px] py-[20px] top-[1.13px] w-[360px]" data-name="Mobile">
      <Content1 />
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[#1a66fc] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[10px] relative w-full">
          <p className="font-['Lato:Bold',_sans-serif] leading-[20px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Seleccionar turno</p>
        </div>
      </div>
    </div>
  );
}

function FixedButton() {
  return (
    <div className="absolute bg-white bottom-0 box-border content-stretch flex flex-col gap-[10px] items-center justify-end left-1/2 px-[16px] py-[24px] shadow-[0px_-4px_6px_-1px_rgba(64,67,91,0.06)] translate-x-[-50%] w-[360px]" data-name="Fixed button">
      <Button9 />
    </div>
  );
}

function ItemLabel() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Item/Label">
      <div aria-hidden="true" className="absolute border-[#1a66fc] border-[0px_0px_4px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-center px-[32px] py-[16px] relative w-full">
          <div className="flex flex-col font-['Lato:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a66fc] text-[16px] text-center text-nowrap">
            <p className="leading-[20px] whitespace-pre">Consulta presencial</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ItemLabel1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Item/Label">
      <div aria-hidden="true" className="absolute border-[#e0e1e9] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-center px-[32px] py-[16px] relative w-full">
          <div className="flex flex-col font-['Lato:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6f93] text-[16px] text-center text-nowrap">
            <p className="leading-[20px] whitespace-pre">Consulta virtual</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tab() {
  return (
    <div className="content-stretch flex items-center relative rounded-[8px] shrink-0 w-full" data-name="Tab">
      <ItemLabel />
      <ItemLabel1 />
    </div>
  );
}

function Frame2609025() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Tab />
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[#023bac] box-border content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="font-['Lato:Bold',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white whitespace-pre">
        <p className="mb-0">Lun</p>
        <p>15/05</p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-[#e8f0ff] box-border content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="font-['Lato:Bold',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1a66fc] text-[14px] text-center text-nowrap whitespace-pre">
        <p className="mb-0">Jue</p>
        <p>17/05</p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-[#e8f0ff] box-border content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="font-['Lato:Bold',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1a66fc] text-[14px] text-center text-nowrap whitespace-pre">
        <p className="mb-0">Lun</p>
        <p>22/05</p>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="bg-[#e8f0ff] box-border content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="font-['Lato:Bold',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1a66fc] text-[14px] text-center text-nowrap whitespace-pre">
        <p className="mb-0">Vie</p>
        <p>04/06</p>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="bg-[#e8f0ff] box-border content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="font-['Lato:Bold',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1a66fc] text-[14px] text-center text-nowrap whitespace-pre">
        <p className="mb-0">Sab</p>
        <p>25/06</p>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="bg-[#e8f0ff] box-border content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <div className="font-['Lato:Bold',_sans-serif] leading-[18px] not-italic relative shrink-0 text-[#1a66fc] text-[14px] text-center text-nowrap whitespace-pre">
        <p className="mb-0">Dom</p>
        <p>26/06</p>
      </div>
    </div>
  );
}

function Frame2609026() {
  return (
    <div className="content-stretch flex gap-[16px] items-start overflow-x-auto overflow-y-clip relative shrink-0 w-full">
      <Button10 />
      <Button11 />
      <Button12 />
      <Button13 />
      <Button14 />
      <Button15 />
    </div>
  );
}

function CalendarCalendarOutline() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Calendar/calendar/outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Calendar/calendar/outline">
          <path d={svgPaths.p3a533070} fill="var(--fill-0, #1A66FC)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Button16() {
  return (
    <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <CalendarCalendarOutline />
      <div className="flex flex-col font-['Lato:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#1a66fc] text-[14px] text-nowrap">
        <p className="leading-[18px] whitespace-pre">Buscar fecha en calendario</p>
      </div>
    </div>
  );
}

function Frame2609023() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full">
      <Frame2609025 />
      <Frame2609026 />
      <Button16 />
    </div>
  );
}

function Modal() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[16px] items-center left-[0.34px] overflow-clip pb-[16px] pt-0 px-[16px] rounded-bl-[16px] rounded-br-[16px] shadow-[0px_10px_15px_-3px_rgba(64,67,91,0.1)] top-[81px] w-[360px]" data-name="Modal">
      <Frame2609023 />
    </div>
  );
}

export default function Component40ResultadosSimples() {
  return (
    <div className="bg-[#f8f8f8] relative size-full" data-name="4.0 Resultados simples">
      <Modal />
      <Search />
      <Mobile />
      <FixedButton />
    </div>
  );
}