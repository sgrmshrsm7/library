import React from "react";

// import "./header_member_style.css";

const home_mem = () => {
    return (
        <div >
			<form class='cd-form' method='GET' action='./home/search'>
                <div className="loginhead">Issued books</div>
				<div class='error-message' id='error-message'>
						<p id='error'></p>
				</div>
				<table width='100%' cellpadding='10' cellspacing='10'>
                    <tr>
                            <th></th>
                            <th>Name of book<hr></hr></th>
                            <th>Edition<hr></hr></th>
                            <th>Author<hr></hr></th>
                            <th>Publication<hr></hr></th>
                            <th>Due_Date<hr></hr></th>
                    </tr>


                    <tr>
                            <td></td>
                            <td>Programming with c++<br></br></td>
                            <td>2nd<br></br></td>
                            <td>Brian Kernighan<br></br></td>
                            <td>Prentice Hall<br></br></td>
                            <td>10-11-2021<br></br></td>
                    </tr>
                    <tr>
                            <td></td>
                            <td>Engineering Circuit Analysis<br></br></td>
                            <td>3rd<br></br></td>
                            <td>William H. Hayt<br></br></td>
                            <td>McGraw Hill Education<br></br></td>
                            <td>10-11-2021<br></br></td>
                    </tr>
                    <tr>
                            <td></td>
                            <td>Theory of Machines<br></br></td>
                            <td>3rd<br></br></td>
                            <td>J.K. Gupta, R.S. Khurmi, and RS Khurmi<br></br></td>
                            <td>S Chand and Co Ltd<br></br></td>
                            <td>10-11-2021<br></br></td>
                    </tr>
                    <tr>
                            <td></td>
                            <td>Mechanical metallurgy<br></br></td>
                            <td>4th<br></br></td>
                            <td>George Dieter<br></br></td>
                            <td>McGraw Hill Education<br></br></td>
                            <td>10-11-2021<br></br></td>
                    </tr>
                    
				</table>
				<br /><br /><input type='submit' name='m_request' value='Request book' />
                                
                                <br/>
                                <a href="/member/home/faq">FAQ</a>
                                <br />
                                <a href="/member/home/reissue">Reissue books</a>
			</form>

		</div>
    );
};

export default home_mem;




