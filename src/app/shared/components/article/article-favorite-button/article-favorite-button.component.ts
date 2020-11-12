import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProfileContext} from '@app/core/models';
import {ProfileService} from '@app/core/authentication/profile.service';
import {ArticleService} from '@app/core/services';
import {CredentialsService} from '@app/core/authentication/credentials.service';
import {Helpers} from '../../../helpers';


@Component({
  selector: 'app-article-favorite-button',
  templateUrl: './article-favorite-button.component.html',
  styleUrls: ['./article-favorite-button.component.scss']
})
export class ArticleFavoriteButtonComponent {
  public readonly helper = new Helpers();
  clients: ProfileContext[];
  isLoading: boolean;

  @Input() favoriteCount: number;
  @Input() set favoriteClients(data: ProfileContext[]){
    this.isLike = data.some(i => {
      if (i.email === this.me.email) {
        return true;
      }
      return false;
    });
  };
  @Input() slug: string;
  @Output() private favoriteUpdated = new EventEmitter();
  public isLike: boolean;
  public loggedIn : boolean;
  public me: ProfileContext;

  constructor(
    private profileService: ProfileService,
    private articleService: ArticleService,
    private credentialService: CredentialsService
  ) {
    this.loggedIn = credentialService.isAuthenticated();
    if (this.loggedIn){
      this.profileService.getProfile().subscribe((profile: ProfileContext) => {
        if (profile) {
          this.me = profile;
        }
      });
    }
  }

  saveFavorite(){
    this.articleService.saveFavoriteArticle(this.slug).subscribe(res=> this.handleResFavorite(res))
  }
  unFavorite(){
    this.articleService.deleteFavoriteArticle(this.slug).subscribe(res=> this.handleResFavorite(res))
  }
  handleResFavorite(res){
    this.favoriteUpdated.emit(res);
  }

}
