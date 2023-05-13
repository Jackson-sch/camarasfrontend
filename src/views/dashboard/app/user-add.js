import React from 'react'
import {Row,Col,Image,Form,Button} from 'react-bootstrap'
import Card from '../../../components/Card'

import {Link} from 'react-router-dom'
// img
import avatars1 from '../../../assets/images/avatars/01.png'
import avatars2 from '../../../assets/images/avatars/avtar_1.png'
import avatars3 from '../../../assets/images/avatars/avtar_2.png'
import avatars4 from '../../../assets/images/avatars/avtar_3.png'
import avatars5 from '../../../assets/images/avatars/avtar_4.png'
import avatars6 from '../../../assets/images/avatars/avtar_5.png'

const UserAdd =() =>{
  return(
      <>
        <div>
            <Row>
               <Col xl="3" lg="4" className="">
                  <Card>
                     <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                           <h4 className="card-title">Añadir Nuevo Usuario</h4>
                        </div>
                     </Card.Header>
                     <Card.Body>
                        <Form>
                           <Form.Group className="form-group">
                              <div className="profile-img-edit position-relative">
                                 <Image className="theme-color-default-img  profile-pic rounded avatar-100" src={avatars1} alt="profile-pic"/>
                                 <Image className="theme-color-purple-img profile-pic rounded avatar-100" src={avatars2} alt="profile-pic"/>
                                 <Image className="theme-color-blue-img profile-pic rounded avatar-100" src={avatars3} alt="profile-pic"/>
                                 <Image className="theme-color-green-img profile-pic rounded avatar-100" src={avatars5} alt="profile-pic"/>
                                 <Image className="theme-color-yellow-img profile-pic rounded avatar-100" src={avatars6} alt="profile-pic"/>
                                 <Image className="theme-color-pink-img profile-pic rounded avatar-100" src={avatars4} alt="profile-pic"/>
                                 <div className="upload-icone bg-primary">
                                    <svg className="upload-button" width="14" height="14" viewBox="0 0 24 24">
                                       <path fill="#ffffff" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                                    </svg>
                                    <Form.Control className="file-upload" type="file" accept="image/*"/>
                                 </div>
                              </div>
                              <div className="img-extension mt-3">
                                 <div className="d-inline-block align-items-center">
                                    <span>Only</span>{' '}
                                    <Link to="#">.jpg</Link>{' '}
                                    <Link to="#">.png</Link>{' '}
                                    <Link to="#">.jpeg</Link>{' '}
                                    <span>allowed</span>
                                 </div>
                              </div>
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label>Rol del usuario:</Form.Label>
                              <select name="type" className="selectpicker form-control" data-style="py-0">
                                 <option>Seleccionar</option>
                                 <option>Web Designer</option>
                                 <option>Web Developer</option>
                                 <option>Tester</option>
                                 <option>Php Developer</option>
                                 <option>Ios Developer </option>
                              </select>
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label htmlFor="furl">Facebook Url:</Form.Label>
                              <Form.Control type="text"  id="furl" placeholder="Facebook Url"/>
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label htmlFor="turl">Twitter Url:</Form.Label>
                              <Form.Control type="text"  id="turl" placeholder="Twitter Url"/>
                           </Form.Group>
                           <Form.Group className="form-group">
                              <Form.Label htmlFor="instaurl">Instagram Url:</Form.Label>
                              <Form.Control type="text"  id="instaurl" placeholder="Instagram Url"/>
                           </Form.Group>
                           <Form.Group className="mb-0 form-group">
                              <Form.Label htmlFor="lurl">Linkedin Url:</Form.Label>
                              <Form.Control type="text"  id="lurl" placeholder="Linkedin Url"/>
                           </Form.Group>
                        </Form>
                     </Card.Body>
                  </Card>
               </Col>
               <Col xl="9" lg="8">
                  <Card>
                     <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                           <h4 className="card-title">Información del Nuevo Usuario</h4>
                        </div>
                     </Card.Header>
                     <Card.Body>
                        <div className="new-user-info">
                           <form>
                              <div className="row">
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="fname">Nombre:</Form.Label>
                                    <Form.Control type="text"  id="fname" placeholder="Nombre"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="lname">Apellido:</Form.Label>
                                    <Form.Control type="text"  id="lname" placeholder="Apellido"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="add1">Dirección:</Form.Label>
                                    <Form.Control type="text"  id="add1" placeholder="Dirección"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="add2">Dirección 2:</Form.Label>
                                    <Form.Control type="text"  id="add2" placeholder="Dirección 2"/>
                                 </Form.Group>
                                 <Form.Group className="col-sm-12 form-group">
                                    <Form.Label>País:</Form.Label>
                                    <select name="type" className="selectpicker form-control" data-style="py-0">
                                       <option>Seleccionar país</option>
                                       <option>Perú</option>
                                       <option>Colombia</option>
                                       <option >EE.UU</option>
                                       <option>India</option>
                                       <option>África</option>
                                    </select>
                                 </Form.Group>
                                 <Form.Group className="col-md-6  form-group">
                                    <Form.Label htmlFor="mobno">Número de Teléfono Móvil:</Form.Label>
                                    <Form.Control type="text"  id="mobno" placeholder="Número de Teléfono Móvil"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6  form-group">
                                    <Form.Label htmlFor="altconno">Contacto Alternativo:</Form.Label>
                                    <Form.Control type="text"  id="altconno" placeholder="Contacto Alternativo"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6  form-group">
                                    <Form.Label htmlFor="email">Correo electrónico:</Form.Label>
                                    <Form.Control type="email"  id="email" placeholder="Correo electrónico"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="pno">Código PIN:</Form.Label>
                                    <Form.Control type="text"  id="pno" placeholder="Código PIN"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-12 form-group">
                                    <Form.Label htmlFor="city">Ciudad:</Form.Label>
                                    <Form.Control type="text"  id="city" placeholder="Ciudad"/>
                                 </Form.Group>
                              </div>
                              <hr/>
                              <h5 className="mb-3">Seguridad</h5>
                              <div className="row">
                                 <Form.Group className="col-md-12 form-group">
                                    <Form.Label htmlFor="uname">Nombre de Usuario:</Form.Label>
                                    <Form.Control type="text"  id="uname" placeholder="Nombre de Usuario"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="pass">Contraseña:</Form.Label>
                                    <Form.Control type="password"  id="pass" placeholder="Contraseña"/>
                                 </Form.Group>
                                 <Form.Group className="col-md-6 form-group">
                                    <Form.Label htmlFor="rpass">Repita la Contraseña:</Form.Label>
                                    <Form.Control type="password"  id="rpass" placeholder="Repita la Contraseña "/>
                                 </Form.Group>
                              </div>
                              <div className="checkbox">
                                 <label className="form-label"><input type="checkbox" className="me-2 form-check-input"  value="" id="flexCheckChecked"/>Habilitar la Autorización de Dos Factores</label>
                              </div>
                              <Button type="button" variant="btn btn-primary">Añadir Nuevo Usuario</Button>
                           </form>
                        </div>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
         </div>
      </>
  )

}

export default UserAdd;