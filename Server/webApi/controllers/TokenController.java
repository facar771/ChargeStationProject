package station.chargeStation.webApi.controllers;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import station.chargeStation.business.abstracts.TokenService;
import station.chargeStation.entities.concretes.User;

@RestController
@RequestMapping("/api/tokens")
public class TokenController {
	
	private TokenService tokenService;
	
	@Autowired
	public TokenController(TokenService tokenService) {
		this.tokenService = tokenService;
	}
	
	@PostMapping("/postUserValidation")
	public String createToken(@RequestBody User user) {
		Date now = new Date();
		System.out.println("Şu anki tarih ve saat: " + now + " Giren Kisi: " + user.getUserName());
		return tokenService.createToken(user.getUserName(), user.getPassword());
	}
	
	@PostMapping("/validateToken")
	public int validateToken(@RequestBody String token) {
		System.out.println("validateToken");
		return tokenService.validateToken(token);
	}
}