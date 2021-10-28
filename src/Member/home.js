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
				</table>
				<br /><br /><input type='submit' name='m_request' value='Request book' />
			</form>

		</div>
    );
};

export default home_mem;




