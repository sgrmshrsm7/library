import React from "react";

// import "./header_member_style.css";

const home_mem = () => {
    return (
        <div >
			<form class='cd-form' method='POST' action='#'>
				<legend>Available books</legend>
				<div class='error-message' id='error-message'>
						<p id='error'></p>
				</div>
				<table width='100%' cellpadding='10' cellspacing='10'>
                    <tr>
                            <th></th>
                            <th>ISBN<hr></hr></th>
                            <th>Title<hr></hr></th>
                            <th>Author<hr></hr></th>
                            <th>Category<hr></hr></th>
                            <th>Price<hr></hr></th>
                            <th>Copies available<hr></hr></th>
                    </tr>
				</table>
				<br /><br /><input type='submit' name='m_request' value='Request book' />
			</form>

		</div>
    );
};

export default home_mem;




