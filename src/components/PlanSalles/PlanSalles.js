import './PlanSalles.css';

const PlanSalles = () => {


    return (  
        <div className="plan_salles">
            <div className="plan_svg">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 650 300" >
                    <g id="plan">
                        <g>
                            <rect id="ascenceur" x="260.4" y="241.3" className="salle" width="48.3" height="20.7"/>
                            <text transform="matrix(1 0 0 1 262.9611 254.875)" className="txt_ascenseur">Ascenseur</text>
                        </g>
                        <g className='salles_loc'>
                            <rect id="baccarat" x="568.6" y="206.7" className="salle" width="67.3" height="42.1"/> 
                            <text transform="matrix(1 0 0 1 578.6277 231.3651)" className="st4 st5">Baccarat</text>
                        </g>
                        <g className='salles_loc'>
                            <rect id="corbin" x="504.1" y="206.7" className="salle" width="63.7" height="42.1"/>
                            <text transform="matrix(1 0 0 1 517.6277 231.3648)" className="st4 st5">Corbin</text>
                        </g>
                        <g className='salles_loc'>
                            <rect id="galle" x="420.6" y="206.7" className="salle" width="82.9" height="42.1"/>
                            <text transform="matrix(1 0 0 1 448.1899 231.3652)" className="st4 st5">Gallé</text>
                        </g>
                        <g className='salles_loc'>
                            <rect id="daum" x="358.1" y="206.7" className="salle" width="61.9" height="42.1"/>
                            <text transform="matrix(1 0 0 1 373.6899 231.3653)" className="st4 st5">Daum</text>
                        </g>
                        <g className='salles_loc'>
                            <rect id="longwy" x="358.1" y="177.7" className="salle" width="82.3" height="28.4"/>
                            <text transform="matrix(1 0 0 1 379.461 194.6768)" className="st4 st5">Longwy</text>
                        </g>
                        <g>
                            <rect id="multimedia" x="344.1" y="129.7" className="salle" width="96.3" height="47.3"/>
                            <text transform="matrix(1 0 0 1 364.9611 155.396)" className="st4 st5">Multimédia</text>
                        </g>
                        <g>
                            <rect id="service" x="219.7" y="185.6" className="salle" width="123.8" height="20.6"/>
                            <text transform="matrix(1 0 0 1 260.9611 199.375)" className="st4 st5">Services</text>
                        </g>
                        <g className='salles_loc'>
                            <rect id="amphi" x="219.7" y="60.6" className="salle" width="123.8" height="124.3"/>
                            <text transform="matrix(1 0 0 1 246.9611 122.375)" className="st4 st5">Amphithéâtre</text>
                        </g>
                        <g className='salles_loc'>
                            <rect id="lamour" x="219.7" y="19" className="salle" width="123.8" height="41"/>
                            <text transform="matrix(1 0 0 1 259.9611 42.3749)" className="st4 st5">Lamour</text>
                        </g>
                        <g>
                            <rect id="administration" x="71.2" y="228.2" className="salle" width="128.1" height="33.8"/>
                            <text transform="matrix(1 0 0 1 93.9611 247.8749)" className="st4 st5">Administration</text>
                        </g>
                        <g className='salles_loc'>
                            <rect id="gruber" x="16" y="206.9" className="salle" width="54.5" height="55.1"/>
                            <text transform="matrix(1 0 0 1 24.9611 236.2712)" className="st4 st5">Grüber</text>
                        </g>
                        <g>
                            <rect id="reprographie" x="16" y="169.7" className="salle" width="90" height="36.5"/>
                            <text transform="matrix(1 0 0 1 24.9611 190.9374)" className="st4 st5">Reprographie</text>
                        </g>
                        <g className='salles_loc'>
                            <rect id="convivialite" x="16" y="106" className="salle" width="90" height="63"/>
                            <text transform="matrix(1 0 0 1 26.2995 131.75)">
                                <tspan x="0" y="0" className="st4 st5">Restauration</tspan>
                                <tspan x="-3.2" y="14.4" className="st4 st5">et convivialité</tspan>
                            </text>
                            <rect id="cuisine" x="16" y="78.2" className="salle" width="90" height="27"/>
                            <text transform="matrix(1 0 0 1 41.4612 94.7708)" className="st4 st5">Cuisine</text>
                        </g>
                        <g className='salles_loc'>
                            <rect id="majorelle" x="16" y="19" className="salle" width="90" height="58.6"/>
                            <text transform="matrix(1 0 0 1 37.4611 53.2712)" className="st4 st5">Majorelle</text>
                        </g>
                        <text transform="matrix(1 0 0 1 209.9474 281.5833)" className="entree_m2l">ENTREE</text>
                    </g>
                    <g id="contour_salles">
                    <path class="contour" d="M217,262.1"/>
	                    <polyline className="contour" points="217,262.1 202,262.1 115.7,262.1 65.7,262.1 15.6,262.1 15.6,18.4 128.8,18.4 128.5,206.2 
		196.1,206.2 196.1,19 343.8,19 343.8,129 440.7,129.1 440.7,206.3 636.2,206.4 636.2,262.1 310.2,262.1 242,262.1 	"/>
	                    <polyline className="contour" points="106.3,18.4 106.3,67.1 106.3,107.6 106.3,152.6 106.3,173.6 106.3,206.5 70.8,206.5 70.8,227.6 
		106.3,227.6 166.7,227.6 199.7,227.6 199.7,262 	"/>
	                    <polyline className="contour" points="219.3,19 219.3,72.2 219.3,119.8 219.3,188.9 219.3,206.5 271.8,206.5 328.8,206.5 343.7,206.5 
		343.7,177.5 357.5,177.5 357.5,249.5 427,249.5 458.9,249.5 496.8,249.5 558.8,249.5 600.8,249.5 635.8,249.5 	"/>
                        <path className="contour" d="M259.9,262v-21.1c49.1,0,49.1,0,49.1,0V262"/>
                        <line className="contour" x1="217" y1="259.2" x2="217" y2="265.9"/>
                        <line className="contour" x1="242" y1="259.2" x2="242" y2="265.9"/>
                    </g>
                </svg>
            </div>
        </div>
    );
}
 
export default PlanSalles;