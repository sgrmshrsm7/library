import React from "react";

// import "./header_member_style.css";

const home_mem = () => {
    return (
        <div >
			<form class='cd-form' method='POST' action='#'>
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
                    </tr>

                    <tr>
                            <th></th>
                            <td>xodufh</td>
                            <td>54</td>
                            <td>Author</td>
                            <td>Publication</td>
                    </tr>

                    <tr>
                            <td></td>
                            <td>978-92-95055-02-5<br></br></td>
                            <td>Programming with c++<br></br></td>
                            <td>Brian Kernighan<br></br></td>
                            <td>Textbook<br></br></td>
                            <td>500 INR<br></br></td>
                            <td>14<br></br></td>
                    </tr>
                    <tr>
                            <td></td>
                            <td>978-92-95055-01-6<br></br></td>
                            <td>Engineering Circuit Analysis<br></br></td>
                            <td>William H. Hayt<br></br></td>
                            <td>Textbook<br></br></td>
                            <td>800 INR<br></br></td>
                            <td>11<br></br></td>
                    </tr>
                    <tr>
                            <td></td>
                            <td>978-92-95055-05-8<br></br></td>
                            <td>Theory of Machines<br></br></td>
                            <td>J.K. Gupta, R.S. Khurmi, and RS Khurmi<br></br></td>
                            <td>Textbook<br></br></td>
                            <td>600 INR<br></br></td>
                            <td>7<br></br></td>
                    </tr>
                    <tr>
                            <td></td>
                            <td>978-78-95055-02-1<br></br></td>
                            <td>Mechanical metallurgy<br></br></td>
                            <td>George Dieter<br></br></td>
                            <td>Textbook<br></br></td>
                            <td>500 INR<br></br></td>
                            <td>4<br></br></td>
                    </tr>
                    <tr>
                            <td></td>
                            <td>978-92-67055-02-4<br></br></td>
                            <td>Introduction to chemical engineering thermodynamics<br></br></td>
                            <td>Joe Mauk Smith<br></br></td>
                            <td>Textbook<br></br></td>
                            <td>500 INR<br></br></td>
                            <td>24<br></br></td>
                    </tr>
                    <tr>
                            <td></td>
                            <td>978-89-67055-02-8<br></br></td>
                            <td>Harry Potter and the Cursed Child<br></br></td>
                            <td>J. K. Rowling, Jack Thorne, and John Tiffany<br></br></td>
                            <td>Fiction<br></br></td>
                            <td>1100 INR<br></br></td>
                            <td>4<br></br></td>
                    </tr>
                    <tr>
                            <td></td>
                            <td>978-89-67055-06-9<br></br></td>
                            <td>2 States: The Story of My Marriage<br></br></td>
                            <td>Chetan Bhagat<br></br></td>
                            <td>Fiction, Romance<br></br></td>
                            <td>300 INR<br></br></td>
                            <td>6<br></br></td>
                    </tr>
                    <tr>
                            <td></td>
                            <td>978-89-67455-06-9<br></br></td>
                            <td>Playing It My Way<br></br></td>
                            <td>Boria Majumdar and Sachin Tendulkar<br></br></td>
                            <td>Autobiography<br></br></td>
                            <td>400 INR<br></br></td>
                            <td>8<br></br></td>
                    </tr>
				</table>
				<br /><br /><input type='submit' name='m_request' value='Request book' />
			</form>

		</div>
    );
};

export default home_mem;




